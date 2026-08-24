import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingService } from '../../core/services/booking.service';
import { Booking, BookingCreateRequest, BookingUpdateRequest, RoomType, BookingStatus } from '../../core/models/booking.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorBannerComponent } from '../../shared/components/error-banner/error-banner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

interface ToastNotification {
  id: number;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorBannerComponent,
    EmptyStateComponent
  ],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnDestroy {
  private bookingService = inject(BookingService);
  private sub = new Subscription();

  isLoading = true;
  apiErrorMessage = '';
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];

  // Search & Filter
  searchTerm = '';
  statusFilter = 'ALL';
  roomTypeFilter = 'ALL';
  startDateFilter = '';
  endDateFilter = '';

  // Sorting
  sortColumn: keyof Booking = 'id';
  sortDirection: 'asc' | 'desc' = 'desc';

  // Toasts
  toasts: ToastNotification[] = [];
  private toastCounter = 0;

  // Create / Edit Modal State
  isModalOpen = false;
  isEditMode = false;
  editingId: number | null = null;
  modalError = '';
  isSubmitting = false;

  // Delete Confirmation Modal State
  isDeleteModalOpen = false;
  bookingToDelete: Booking | null = null;
  isDeleting = false;

  // Form Model
  formData: {
    hotelName: string;
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    roomType: RoomType;
    bookingStatus: BookingStatus;
    totalRevenue: number;
  } = {
    hotelName: 'Grand Horizon Resort',
    guestName: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 2,
    roomType: 'DELUXE',
    bookingStatus: 'CONFIRMED',
    totalRevenue: 1250.00
  };

  hotelOptions: string[] = [
    'Grand Horizon Resort',
    'Starlight Palace Hotel',
    'Royal Palm Haven',
    'Azure Bay Suites'
  ];

  roomTypes: RoomType[] = ['SINGLE', 'DOUBLE', 'DELUXE', 'SUITE', 'PRESIDENTIAL'];
  bookingStatuses: BookingStatus[] = ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'];

  ngOnInit(): void {
    this.resetDatesToDefault();
    this.loadBookings();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  resetDatesToDefault(): void {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);
    this.formData.checkInDate = today.toISOString().split('T')[0];
    this.formData.checkOutDate = nextWeek.toISOString().split('T')[0];
  }

  loadBookings(): void {
    this.isLoading = true;
    this.apiErrorMessage = '';

    this.sub.add(
      this.bookingService.getAllBookings().subscribe({
        next: (data) => {
          this.bookings = data;
          this.applyFiltersAndSort();
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.apiErrorMessage = err.message || 'Failed to load bookings from Spring Boot API.';
          this.showToast('error', 'API Connection Error', this.apiErrorMessage);
        }
      })
    );
  }

  applyFiltersAndSort(): void {
    const search = this.searchTerm.toLowerCase().trim();

    let result = this.bookings.filter(b => {
      // Search by guest name, hotel property, or booking ID
      const matchSearch = !search ||
        b.guestName.toLowerCase().includes(search) ||
        b.id.toString() === search ||
        ('#' + b.id).includes(search) ||
        b.hotelName.toLowerCase().includes(search);

      // Filter by booking status
      const matchStatus = this.statusFilter === 'ALL' || b.bookingStatus === this.statusFilter;

      // Filter by room type
      const matchRoom = this.roomTypeFilter === 'ALL' || b.roomType === this.roomTypeFilter;

      // Filter by date range
      const matchStart = !this.startDateFilter || b.checkInDate >= this.startDateFilter;
      const matchEnd = !this.endDateFilter || b.checkOutDate <= this.endDateFilter;

      return matchSearch && matchStatus && matchRoom && matchStart && matchEnd;
    });

    // Sort
    result.sort((a, b) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];

      if (typeof valA === 'string') {
        valA = (valA as string).toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredBookings = result;
  }

  toggleSort(column: keyof Booking): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'ALL';
    this.roomTypeFilter = 'ALL';
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.applyFiltersAndSort();
  }

  // MODAL CREATION / EDITING
  openCreateModal(): void {
    this.isEditMode = false;
    this.editingId = null;
    this.modalError = '';
    this.resetDatesToDefault();
    this.formData.guestName = '';
    this.formData.totalRevenue = 1250.00;
    this.formData.guests = 2;
    this.formData.roomType = 'DELUXE';
    this.formData.bookingStatus = 'CONFIRMED';
    this.formData.hotelName = 'Grand Horizon Resort';
    this.isModalOpen = true;
  }

  openEditModal(booking: Booking): void {
    this.isEditMode = true;
    this.editingId = booking.id;
    this.modalError = '';
    this.formData = {
      hotelName: booking.hotelName,
      guestName: booking.guestName,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      guests: booking.guests,
      roomType: booking.roomType,
      bookingStatus: booking.bookingStatus,
      totalRevenue: Number(booking.totalRevenue)
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalError = '';
  }

  // VALIDATION & SUBMIT
  handleSubmit(): void {
    this.modalError = '';

    // 1. Required Field Validations
    if (!this.formData.hotelName || !this.formData.hotelName.trim()) {
      this.modalError = 'Hotel property name is required.';
      return;
    }
    if (!this.formData.guestName || !this.formData.guestName.trim()) {
      this.modalError = 'Guest name cannot be blank.';
      return;
    }
    if (!this.formData.checkInDate) {
      this.modalError = 'Check-in date is required.';
      return;
    }
    if (!this.formData.checkOutDate) {
      this.modalError = 'Check-out date is required.';
      return;
    }

    // 2. Strict Date Validation
    const checkIn = new Date(this.formData.checkInDate);
    const checkOut = new Date(this.formData.checkOutDate);
    if (checkOut <= checkIn) {
      this.modalError = `Check-out date (${this.formData.checkOutDate}) must be strictly after check-in date (${this.formData.checkInDate}).`;
      return;
    }

    // 3. Monetary & Guest Bounds
    if (this.formData.guests < 1) {
      this.modalError = 'Number of guests must be at least 1.';
      return;
    }
    if (!this.formData.totalRevenue || this.formData.totalRevenue <= 0) {
      this.modalError = 'Total revenue amount must be greater than $0.00.';
      return;
    }

    this.isSubmitting = true;

    if (this.isEditMode && this.editingId !== null) {
      const updateReq: BookingUpdateRequest = {
        hotelName: this.formData.hotelName.trim(),
        guestName: this.formData.guestName.trim(),
        checkInDate: this.formData.checkInDate,
        checkOutDate: this.formData.checkOutDate,
        guests: Number(this.formData.guests),
        roomType: this.formData.roomType,
        bookingStatus: this.formData.bookingStatus,
        totalRevenue: Number(this.formData.totalRevenue)
      };

      this.sub.add(
        this.bookingService.updateBooking(this.editingId, updateReq).subscribe({
          next: (updated) => {
            this.isSubmitting = false;
            this.closeModal();
            this.showToast('success', 'Reservation Updated', `Reservation #${updated.id} for ${updated.guestName} was successfully updated.`);
            this.loadBookings();
          },
          error: (err) => {
            this.isSubmitting = false;
            this.modalError = err.message || 'Failed to update reservation on backend.';
            this.showToast('error', 'Update Failed', this.modalError);
          }
        })
      );
    } else {
      const createReq: BookingCreateRequest = {
        hotelName: this.formData.hotelName.trim(),
        guestName: this.formData.guestName.trim(),
        checkInDate: this.formData.checkInDate,
        checkOutDate: this.formData.checkOutDate,
        guests: Number(this.formData.guests),
        roomType: this.formData.roomType,
        bookingStatus: this.formData.bookingStatus,
        totalRevenue: Number(this.formData.totalRevenue)
      };

      this.sub.add(
        this.bookingService.createBooking(createReq).subscribe({
          next: (created) => {
            this.isSubmitting = false;
            this.closeModal();
            this.showToast('success', 'Reservation Created', `Reservation #${created.id} for ${created.guestName} has been stored.`);
            this.loadBookings();
          },
          error: (err) => {
            this.isSubmitting = false;
            this.modalError = err.message || 'Failed to create reservation on backend.';
            this.showToast('error', 'Creation Failed', this.modalError);
          }
        })
      );
    }
  }

  // DELETE CONFIRMATION MODAL
  openDeleteModal(booking: Booking): void {
    this.bookingToDelete = booking;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.bookingToDelete = null;
  }

  confirmDelete(): void {
    if (!this.bookingToDelete) return;

    const id = this.bookingToDelete.id;
    const guest = this.bookingToDelete.guestName;
    this.isDeleting = true;

    this.sub.add(
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.isDeleting = false;
          this.closeDeleteModal();
          this.showToast('info', 'Reservation Deleted', `Reservation #${id} for ${guest} has been permanently deleted.`);
          this.loadBookings();
        },
        error: (err) => {
          this.isDeleting = false;
          this.showToast('error', 'Delete Failed', err.message || `Could not delete booking #${id}`);
        }
      })
    );
  }

  // HELPERS
  calculateStayNights(): number {
    if (!this.formData.checkInDate || !this.formData.checkOutDate) return 0;
    const inDate = new Date(this.formData.checkInDate);
    const outDate = new Date(this.formData.checkOutDate);
    const diffTime = outDate.getTime() - inDate.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  getNightsForBooking(checkIn: string, checkOut: string): number {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
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

  getRoomBadgeClass(type: string): string {
    switch (type) {
      case 'PRESIDENTIAL': return 'badge-presidential';
      case 'SUITE': return 'badge-suite';
      case 'DELUXE': return 'badge-deluxe';
      case 'DOUBLE': return 'badge-double';
      case 'SINGLE': return 'badge-single';
      default: return '';
    }
  }

  // TOAST SYSTEM
  showToast(type: 'success' | 'error' | 'info', title: string, message: string): void {
    const id = ++this.toastCounter;
    const toast: ToastNotification = { id, type, title, message };
    this.toasts.push(toast);

    setTimeout(() => {
      this.removeToast(id);
    }, 4500);
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}
