import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { AnalyticsService } from '../../core/services/analytics.service';
import {
  TotalRevenueResponse,
  HotelRevenueResponse,
  MonthlyRevenueResponse,
  StatusCountResponse,
  AverageRevenueResponse,
  TopHotelResponse
} from '../../core/models/analytics.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorBannerComponent } from '../../shared/components/error-banner/error-banner.component';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorBannerComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  private analyticsService = inject(AnalyticsService);
  private sub = new Subscription();

  @ViewChild('hotelBarChartCanvas') hotelBarChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyBarChartCanvas') monthlyBarChartCanvas!: ElementRef<HTMLCanvasElement>;

  private hotelBarChart: Chart | null = null;
  private monthlyBarChart: Chart | null = null;

  isLoading = true;
  errorMessage = '';

  topLimit = 5;

  totalRevenue: TotalRevenueResponse | null = null;
  avgRevenue: AverageRevenueResponse | null = null;
  hotelRevenues: HotelRevenueResponse[] = [];
  monthlyTrends: MonthlyRevenueResponse[] = [];
  statusCounts: StatusCountResponse[] = [];
  topHotels: TopHotelResponse[] = [];

  ngOnInit(): void {
    this.loadAnalytics();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.hotelBarChart) this.hotelBarChart.destroy();
    if (this.monthlyBarChart) this.monthlyBarChart.destroy();
  }

  loadAnalytics(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const req$ = forkJoin({
      total: this.analyticsService.getTotalRevenue(),
      avg: this.analyticsService.getAverageRevenue(),
      hotels: this.analyticsService.getRevenueByHotel(),
      months: this.analyticsService.getRevenueByMonth(),
      statuses: this.analyticsService.getBookingCountByStatus(),
      top: this.analyticsService.getTopHotels(this.topLimit)
    });

    this.sub.add(
      req$.subscribe({
        next: (data) => {
          this.totalRevenue = data.total;
          this.avgRevenue = data.avg;
          this.hotelRevenues = data.hotels;
          this.monthlyTrends = data.months;
          this.statusCounts = data.statuses;
          this.topHotels = data.top;
          this.isLoading = false;

          setTimeout(() => {
            this.renderHotelBarChart();
            this.renderMonthlyBarChart();
          }, 50);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message || 'Failed to load analytical metrics from backend.';
        }
      })
    );
  }

  onLimitChange(): void {
    this.analyticsService.getTopHotels(this.topLimit).subscribe({
      next: (top) => {
        this.topHotels = top;
      }
    });
  }

  renderHotelBarChart(): void {
    if (!this.hotelBarChartCanvas) return;
    if (this.hotelBarChart) this.hotelBarChart.destroy();

    const ctx = this.hotelBarChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.hotelRevenues.map(h => h.hotelName);
    const data = this.hotelRevenues.map(h => h.totalRevenue);

    this.hotelBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Total Revenue ($)',
          data,
          backgroundColor: 'rgba(168, 85, 247, 0.65)',
          borderColor: '#a855f7',
          borderWidth: 1,
          borderRadius: 8,
          hoverBackgroundColor: '#c084fc'
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
            callbacks: {
              label: (ctx) => ` Revenue: $${Number(ctx.parsed.y).toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans, sans-serif', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono, monospace', size: 10 }, callback: (v) => '$' + v }
          }
        }
      }
    });
  }

  renderMonthlyBarChart(): void {
    if (!this.monthlyBarChartCanvas) return;
    if (this.monthlyBarChart) this.monthlyBarChart.destroy();

    const ctx = this.monthlyBarChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.monthlyTrends.map(m => m.yearMonth);
    const data = this.monthlyTrends.map(m => m.totalRevenue);

    this.monthlyBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Monthly Gross ($)',
          data,
          backgroundColor: 'rgba(59, 130, 246, 0.65)',
          borderColor: '#3b82f6',
          borderWidth: 1,
          borderRadius: 8,
          hoverBackgroundColor: '#60a5fa'
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
            callbacks: {
              label: (ctx) => ` Revenue: $${Number(ctx.parsed.y).toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono, monospace', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono, monospace', size: 10 }, callback: (v) => '$' + v }
          }
        }
      }
    });
  }

  formatCurrency(val: number): string {
    return '$' + Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getShare(revenue: number): number {
    const total = this.totalRevenue?.totalRevenue ?? 1;
    return total > 0 ? Math.round((revenue / total) * 100) : 0;
  }
}
