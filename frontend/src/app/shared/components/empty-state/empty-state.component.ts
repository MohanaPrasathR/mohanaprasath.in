import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <div class="empty-icon">{{ icon }}</div>
      <h4 class="empty-title">{{ title }}</h4>
      <p class="empty-description">{{ description }}</p>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      text-align: center;
      background: rgba(255, 255, 255, 0.01);
      border: 1px dashed rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      margin: 1rem 0;
    }
    .empty-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
      opacity: 0.7;
    }
    .empty-title {
      font-size: 1rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0 0 0.25rem 0;
    }
    .empty-description {
      font-size: 0.825rem;
      color: #94a3b8;
      max-width: 360px;
      margin: 0;
      font-family: var(--font-mono);
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon: string = '🔍';
  @Input() title: string = 'No Data Found';
  @Input() description: string = 'No reservations match your current query or filter criteria.';
}
