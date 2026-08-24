import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container" [class.overlay]="overlay">
      <div class="spinner-ring"></div>
      <p *ngIf="message" class="spinner-text">{{ message }}</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 1rem;
      gap: 1rem;
    }
    .loading-container.overlay {
      position: absolute;
      inset: 0;
      background: rgba(11, 15, 25, 0.75);
      backdrop-filter: blur(4px);
      z-index: 30;
      border-radius: inherit;
    }
    .spinner-ring {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(16, 185, 129, 0.15);
      border-top-color: #10b981;
      border-right-color: #10b981;
      border-radius: 50%;
      animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    .spinner-text {
      font-size: 0.85rem;
      color: #94a3b8;
      font-family: var(--font-mono);
      letter-spacing: 0.025em;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'Loading live data...';
  @Input() overlay: boolean = false;
}
