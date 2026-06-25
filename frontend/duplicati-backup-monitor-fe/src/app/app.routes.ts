import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ServerDetail } from './components/detail/detail';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'server/:id', component: ServerDetail },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
