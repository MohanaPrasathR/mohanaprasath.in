import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-banner">
      <div class="error-icon">⚠️</div>
      <div class="error-content">
        <h4 class="error-title">{{ title }}</h4>
        <p class="error-message">{{ message }}</p>
      </div>
      <button *ngIf="showRetry" (click)="retry.emit()" class="retry-btn">
        <span>↻ Retry</span>
      </button>
    </div>
  `,
  styles: [`
    .error-banner {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: rgba(244, 63, 94, 0.08);
      border: 1px solid rgba(244, 63, 94, 0.25);
      border-radius: 1rem;
      color: #fca5a5;
      margin: 1rem 0;
    }
    .error-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    .error-content {
      flex: 1;
    }
    .error-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #f87171;
      margin: 0 0 0.25rem 0;
    }
    .error-message {
      font-size: 0.8rem;
      color: #cbd5e1;
      margin: 0;
      font-family: var(--font-mono);
    }
    .retry-btn {
      padding: 0.5rem 1rem;
      background: rgba(244, 63, 94, 0.2);
      border: 1px solid rgba(244, 63, 94, 0.4);
      color: #ffffff;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: var(--font-mono);
      white-space: nowrap;
    }
    .retry-btn:hover {
      background: rgba(244, 63, 94, 0.35);
      transform: translateY(-1px);
    }
  `]
})
export class ErrorBannerComponent {
  @Input() title: string = 'Backend Connection Issue';
  @Input() message: string = 'Failed to load data from Spring Boot backend.';
  @Input() showRetry: boolean = true;
  @Output() retry = new EventEmitter<void>();
}
