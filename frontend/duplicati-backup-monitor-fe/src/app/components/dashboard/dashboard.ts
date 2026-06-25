import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import {
  DashboardService,
  ServerCard,
  ServerStatus,
  BackupSummary,
} from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  servers = signal<ServerCard[]>([]);
  summary = signal<BackupSummary>({ ok: 0, warning: 0, error: 0, unknown: 0 });
  loading = signal(true);
  error = signal(false);

  // Badge della navbar: totale backup dei server online per stato
  readonly summaryBadges: { key: keyof BackupSummary; label: string; bg: string }[] = [
    { key: 'ok', label: 'OK', bg: 'bg-verde-ok' },
    { key: 'warning', label: 'WARNING', bg: 'bg-giallo-warning' },
    { key: 'error', label: 'ERROR', bg: 'bg-rosso-error' },
    { key: 'unknown', label: 'UNKNOWN', bg: 'bg-viola-unknown' },
  ];

  // Colore della pillola di stato sulla card
  private readonly pillColors: Record<ServerStatus, string> = {
    OK: 'bg-verde-ok',
    WARNING: 'bg-giallo-warning',
    ERROR: 'bg-rosso-error',
    UNKNOWN: 'bg-viola-unknown',
    OFFLINE: '',
  };

  ngOnInit(): void {
    this.dashboardService
      .getDashboard()
      .pipe(catchError(() => of(null)))
      .subscribe((data) => {
        this.loading.set(false);
        if (!data) {
          this.error.set(true);
          return;
        }
        this.servers.set(data.servers);
        this.summary.set(data.summary);
      });
  }

  pillClass(status: ServerStatus): string {
    return this.pillColors[status];
  }

  formatId(id: number): string {
    return '#ID' + id.toString().padStart(4, '0');
  }
}
