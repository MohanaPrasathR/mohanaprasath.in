import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar">
      <div class="navbar-container">
        
        <!-- Logo & Brand -->
        <div class="brand-section">
          <div class="brand-logo">
            <span>🏨</span>
          </div>
          <div>
            <div class="brand-title-row">
              <span class="brand-title">Hotel Revenue Analytics</span>
              <span class="brand-tag">Angular 19</span>
            </div>
            <p class="brand-subtitle">Spring Boot 3 · JPA · H2 / MySQL</p>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
            <span>📊</span> Dashboard
          </a>
          <a routerLink="/bookings" routerLinkActive="active" class="nav-link">
            <span>📋</span> Bookings
          </a>
          <a routerLink="/analytics" routerLinkActive="active" class="nav-link">
            <span>📈</span> Analytics
          </a>
          <a routerLink="/about" routerLinkActive="active" class="nav-link">
            <span>ℹ️</span> About
          </a>
        </nav>

        <!-- Right Actions -->
        <div class="actions-section">
          <!-- Backend Live Connection Pill -->
          <div class="status-pill" [class.connected]="backendOnline" [class.offline]="!backendOnline">
            <span class="status-dot"></span>
            <span class="status-label">{{ backendOnline ? 'API Connected' : 'API Offline' }}</span>
          </div>

          <!-- Refresh Data Trigger -->
          <button (click)="refreshRequested.emit()" class="action-btn icon-only" title="Refresh Live Data">
            <span>↻</span>
          </button>

          <!-- Swagger Link -->
          <a href="http://localhost:8080/swagger-ui/index.html" target="_blank" rel="noreferrer" class="action-btn swagger-btn">
            <span>⚡ Swagger</span>
          </a>
        </div>

      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(10, 15, 29, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.875rem 1.5rem;
    }
    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .brand-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .brand-logo {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.75rem;
      background: linear-gradient(135deg, #10b981, #0d9488);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      box-shadow: 0 0 20px -3px rgba(16, 185, 129, 0.4);
    }
    .brand-title-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .brand-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
    }
    .brand-tag {
      font-size: 0.65rem;
      font-weight: 700;
      font-family: var(--font-mono);
      padding: 0.125rem 0.375rem;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 9999px;
    }
    .brand-subtitle {
      font-size: 0.7rem;
      color: #94a3b8;
      font-family: var(--font-mono);
      margin: 0;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.875rem;
      border-radius: 0.625rem;
      font-size: 0.825rem;
      font-weight: 600;
      color: #94a3b8;
      text-decoration: none;
      transition: all 0.2s;
    }
    .nav-link:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }
    .nav-link.active {
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
    }

    .actions-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .status-pill {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.725rem;
      font-family: var(--font-mono);
      font-weight: 600;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .status-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
    }
    .status-pill.connected {
      color: #34d399;
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.25);
    }
    .status-pill.connected .status-dot {
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
      animation: pulse 2s infinite;
    }
    .status-pill.offline {
      color: #f87171;
      background: rgba(244, 63, 94, 0.1);
      border-color: rgba(244, 63, 94, 0.25);
    }
    .status-pill.offline .status-dot {
      background: #f43f5e;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.875rem;
      border-radius: 0.625rem;
      font-size: 0.75rem;
      font-weight: 600;
      font-family: var(--font-mono);
      cursor: pointer;
      text-decoration: none;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      transition: all 0.2s;
    }
    .action-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
    .action-btn.icon-only {
      padding: 0.5rem 0.625rem;
      font-size: 0.95rem;
    }
    .swagger-btn {
      color: #a78bfa;
      border-color: rgba(167, 139, 250, 0.25);
      background: rgba(167, 139, 250, 0.08);
    }
    .swagger-btn:hover {
      background: rgba(167, 139, 250, 0.18);
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    @media (max-width: 900px) {
      .nav-links {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  @Input() backendOnline: boolean = true;
  @Output() refreshRequested = new EventEmitter<void>();
}
