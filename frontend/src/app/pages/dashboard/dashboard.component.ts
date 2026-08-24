import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { AnalyticsService } from '../../core/services/analytics.service';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../core/models/booking.model';
import {
  TotalRevenueResponse,
  HotelRevenueResponse,
  MonthlyRevenueResponse,
  StatusCountResponse,
  AverageRevenueResponse,
  TopHotelResponse
} from '../../core/models/analytics.model';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorBannerComponent } from '../../shared/components/error-banner/error-banner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    KpiCardComponent,
    LoadingSpinnerComponent,
    ErrorBannerComponent,
    EmptyStateComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private analyticsService = inject(AnalyticsService);
  private bookingService = inject(BookingService);
  private sub = new Subscription();

  @ViewChild('revenueChartCanvas') revenueChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('occupancyChartCanvas') occupancyChartCanvas!: ElementRef<HTMLCanvasElement>;

  private revenueChart: Chart | null = null;
  private occupancyChart: Chart | null = null;

  isLoading = true;
  errorMessage = '';
  backendConnected = true;

  // Date-range filter
  startDate: string = '';
  endDate: string = '';
  selectedRangePreset: string = 'ALL';

  // Analytics & Booking State
  totalRevenueData: TotalRevenueResponse | null = null;
  avgRevenueData: AverageRevenueResponse | null = null;
  statusCountList: StatusCountResponse[] = [];
  monthlyTrends: MonthlyRevenueResponse[] = [];
  hotelRevenues: HotelRevenueResponse[] = [];
  topHotels: TopHotelResponse[] = [];
  allBookings: Booking[] = [];
  filteredRecentBookings: Booking[] = [];

  // Computed Dashboard Metrics
  summaryMetrics = {
    totalRevenue: '$0.00',
    totalBookings: 0,
    activeBookingsCount: 0,
    occupancyRate: '0.0%',
    averageDailyRate: '$0.00',
    cancellations: 0,
    topHotelName: 'Loading...',
    topHotelRevenue: '$0.00'
  };

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.revenueChart) this.revenueChart.destroy();
    if (this.occupancyChart) this.occupancyChart.destroy();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const req$ = forkJoin({
      totalRevenue: this.analyticsService.getTotalRevenue(),
      avgRevenue: this.analyticsService.getAverageRevenue(),
      hotelRevenues: this.analyticsService.getRevenueByHotel(),
      monthlyTrends: this.analyticsService.getRevenueByMonth(),
      statusCounts: this.analyticsService.getBookingCountByStatus(),
      topHotels: this.analyticsService.getTopHotels(5),
      bookings: this.bookingService.getAllBookings()
    });

    this.sub.add(
      req$.subscribe({
        next: (data) => {
          this.backendConnected = true;
          this.totalRevenueData = data.totalRevenue;
          this.avgRevenueData = data.avgRevenue;
          this.hotelRevenues = data.hotelRevenues;
          this.monthlyTrends = data.monthlyTrends;
          this.statusCountList = data.statusCounts;
          this.topHotels = data.topHotels;
          this.allBookings = data.bookings;

          this.calculateMetrics();
          this.applyDateFilter();
          this.isLoading = false;

          // Render charts in next tick after DOM update
          setTimeout(() => {
            this.renderRevenueTrendChart();
            this.renderOccupancyChart();
          }, 50);
        },
        error: (err) => {
          this.isLoading = false;
          this.backendConnected = false;
          this.errorMessage = err.message || 'Failed to connect to backend server on http://localhost:8080.';
        }
      })
    );
  }

  calculateMetrics(): void {
    // 1. Total Revenue
    const rev = this.totalRevenueData?.totalRevenue ?? 0;
    this.summaryMetrics.totalRevenue = this.formatCurrency(rev);

    // 2. Total Bookings & Active Bookings
    const totalCount = this.allBookings.length;
    this.summaryMetrics.totalBookings = totalCount;
    this.summaryMetrics.activeBookingsCount = this.totalRevenueData?.eligibleBookingsCount ?? 0;

    // 3. Cancellations
    const cancelledItem = this.statusCountList.find(s => s.bookingStatus === 'CANCELLED');
    this.summaryMetrics.cancellations = cancelledItem ? cancelledItem.count : 0;

    // 4. Occupancy Rate (Checked In + Checked Out + Confirmed vs Total)
    if (totalCount > 0) {
      const activeCount = totalCount - this.summaryMetrics.cancellations;
      const rate = (activeCount / totalCount) * 100;
      this.summaryMetrics.occupancyRate = rate.toFixed(1) + '%';
    } else {
      this.summaryMetrics.occupancyRate = '0.0%';
    }

    // 5. Average Daily Rate (ADR)
    const adr = this.avgRevenueData?.averageRevenuePerBooking ?? 0;
    this.summaryMetrics.averageDailyRate = this.formatCurrency(adr);

    // 6. Top Hotel
    if (this.topHotels && this.topHotels.length > 0) {
      this.summaryMetrics.topHotelName = this.topHotels[0].hotelName;
      this.summaryMetrics.topHotelRevenue = this.formatCurrency(this.topHotels[0].totalRevenue);
    } else {
      this.summaryMetrics.topHotelName = 'N/A';
      this.summaryMetrics.topHotelRevenue = '$0.00';
    }
  }

  applyDateFilter(): void {
    let filtered = [...this.allBookings];

    if (this.startDate) {
      filtered = filtered.filter(b => b.checkInDate >= this.startDate);
    }
    if (this.endDate) {
      filtered = filtered.filter(b => b.checkOutDate <= this.endDate);
    }

    // Show most recent bookings first
    this.filteredRecentBookings = filtered.slice(0, 8);
  }

  setPreset(preset: 'ALL' | 'THIS_MONTH' | 'LAST_3_MONTHS'): void {
    this.selectedRangePreset = preset;
    const now = new Date();

    if (preset === 'ALL') {
      this.startDate = '';
      this.endDate = '';
    } else if (preset === 'THIS_MONTH') {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      this.startDate = firstDay.toISOString().split('T')[0];
      this.endDate = lastDay.toISOString().split('T')[0];
    } else if (preset === 'LAST_3_MONTHS') {
      const pastDay = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      this.startDate = pastDay.toISOString().split('T')[0];
      this.endDate = now.toISOString().split('T')[0];
    }

    this.applyDateFilter();
  }

  renderRevenueTrendChart(): void {
    if (!this.revenueChartCanvas) return;
    if (this.revenueChart) this.revenueChart.destroy();

    const ctx = this.revenueChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.monthlyTrends.map(m => m.yearMonth);
    const revenues = this.monthlyTrends.map(m => m.totalRevenue);

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    this.revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Gross Monthly Revenue ($)',
          data: revenues,
          borderColor: '#10b981',
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#e2e8f0',
            bodyColor: '#10b981',
            callbacks: {
              label: (ctx) => ` Revenue: $${Number(ctx.parsed.y).toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono, monospace', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#94a3b8',
              font: { family: 'JetBrains Mono, monospace', size: 11 },
              callback: (val) => '$' + val
            }
          }
        }
      }
    });
  }

  renderOccupancyChart(): void {
    if (!this.occupancyChartCanvas) return;
    if (this.occupancyChart) this.occupancyChart.destroy();

    const ctx = this.occupancyChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.statusCountList.map(s => s.bookingStatus);
    const dataCounts = this.statusCountList.map(s => s.count);
    const bgColors = ['#3b82f6', '#10b981', '#64748b', '#f43f5e'];

    this.occupancyChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: dataCounts,
          backgroundColor: bgColors,
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: { family: 'JetBrains Mono, monospace', size: 10 },
              padding: 12,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1
          }
        }
      }
    });
  }

  formatCurrency(amount: number): string {
    return '$' + Number(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'status-confirmed';
      case 'CHECKED_IN': return 'status-checked-in';
      case 'CHECKED_OUT': return 'status-checked-out';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  }

  getRankIcon(index: number): string {
    const icons = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    return icons[index] || `#${index + 1}`;
  }

  getSharePercent(revenue: number): number {
    const total = this.totalRevenueData?.totalRevenue ?? 1;
    return total > 0 ? Math.round((revenue / total) * 100) : 0;
  }
}
