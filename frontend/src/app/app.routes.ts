import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard | Hotel Revenue Analytics' },
  { path: 'bookings', component: BookingsComponent, title: 'Bookings | Hotel Revenue Analytics' },
  { path: 'analytics', component: AnalyticsComponent, title: 'Analytics | Hotel Revenue Analytics' },
  { path: 'about', component: AboutComponent, title: 'About | Hotel Revenue Analytics' },
  { path: '**', redirectTo: 'dashboard' }
];
