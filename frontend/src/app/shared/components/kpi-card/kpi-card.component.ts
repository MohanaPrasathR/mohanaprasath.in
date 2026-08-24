import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card group" [class]="'theme-' + colorTheme">
      <div class="glow-bg"></div>
      <div class="card-header">
        <span class="card-label">{{ label }}</span>
        <div class="icon-container">
          <span>{{ icon }}</span>
        </div>
      </div>
      <div class="card-value">{{ value }}</div>
      <div class="card-footer">
        <span *ngIf="badge" class="footer-badge">{{ badge }}</span>
        <span class="footer-subtext">{{ subtext }}</span>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      position: relative;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.25rem;
      padding: 1.25rem 1.5rem;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    }
    .kpi-card:hover {
      transform: translateY(-3px);
      border-color: rgba(255, 255, 255, 0.18);
      box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.6);
    }
    .glow-bg {
      position: absolute;
      right: -2rem;
      bottom: -2rem;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      filter: blur(2rem);
      opacity: 0.3;
      transition: all 0.3s;
    }
    .theme-emerald .glow-bg { background: #10b981; }
    .theme-blue .glow-bg { background: #3b82f6; }
    .theme-purple .glow-bg { background: #a855f7; }
    .theme-amber .glow-bg { background: #f59e0b; }
    .theme-rose .glow-bg { background: #f43f5e; }

    .kpi-card:hover .glow-bg {
      opacity: 0.5;
      transform: scale(1.2);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }
    .card-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: var(--font-mono);
    }
    .icon-container {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 0.625rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .theme-emerald .icon-container { background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); }
    .theme-blue .icon-container { background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.2); }
    .theme-purple .icon-container { background: rgba(168, 85, 247, 0.1); border-color: rgba(168, 85, 247, 0.2); }
    .theme-amber .icon-container { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2); }
    .theme-rose .icon-container { background: rgba(244, 63, 94, 0.1); border-color: rgba(244, 63, 94, 0.2); }

    .card-value {
      font-size: 1.85rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
      font-family: var(--font-mono);
      margin-bottom: 0.5rem;
    }
    .card-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: #94a3b8;
    }
    .footer-badge {
      padding: 0.125rem 0.375rem;
      border-radius: 0.375rem;
      font-size: 0.7rem;
      font-weight: 700;
      font-family: var(--font-mono);
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .theme-rose .footer-badge {
      background: rgba(244, 63, 94, 0.15);
      color: #fb7185;
      border-color: rgba(244, 63, 94, 0.3);
    }
    .footer-subtext {
      font-family: var(--font-mono);
      font-size: 0.725rem;
    }
  `]
})
export class KpiCardComponent {
  @Input() label: string = '';
  @Input() value: string = '$0.00';
  @Input() icon: string = '📊';
  @Input() subtext: string = '';
  @Input() badge: string = '';
  @Input() colorTheme: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' = 'emerald';
}
