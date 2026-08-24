import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AnalyticsService } from './core/services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  backendOnline = true;

  ngOnInit(): void {
    this.checkHealth();
  }

  checkHealth(): void {
    this.analyticsService.getTotalRevenue().subscribe({
      next: () => {
        this.backendOnline = true;
      },
      error: () => {
        this.backendOnline = false;
      }
    });
  }

  onRefresh(): void {
    this.checkHealth();
    // Dispatch global event or rely on router component reload
    window.location.reload();
  }
}
