import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type ServerStatus = 'OK' | 'WARNING' | 'ERROR' | 'UNKNOWN' | 'OFFLINE';

interface Server {
  id: number;
  name: string;
  status: ServerStatus;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  servers: Server[] = [
    { id: 1, name: 'Duplicati Locale', status: 'OK' },
    { id: 2, name: 'Server Produzione Mock', status: 'WARNING' },
    { id: 3, name: 'Server Legacy Mock', status: 'OFFLINE' },
    { id: 4, name: 'Server Test', status: 'ERROR' },
    { id: 5, name: 'Server Backup', status: 'UNKNOWN' },
    { id: 6, name: 'Server Dev', status: 'OK' },
  ];

  // Badge della navbar (in ordine, come nel design Figma)
  readonly summary: { status: ServerStatus; label: string; bg: string }[] = [
    { status: 'OK', label: 'OK', bg: 'bg-verde-ok/80' },
    { status: 'WARNING', label: 'WARNING', bg: 'bg-giallo-warning' },
    { status: 'ERROR', label: 'ERROR', bg: 'bg-rosso-error' },
    { status: 'UNKNOWN', label: 'UNKNOWN', bg: 'bg-viola-unknown' },
  ];

  // Colore della pillola di stato sulla card
  private readonly pillColors: Record<ServerStatus, string> = {
    OK: 'bg-verde-ok/70',
    WARNING: 'bg-giallo-warning/70',
    ERROR: 'bg-rosso-error/70',
    UNKNOWN: 'bg-viola-unknown/70',
    OFFLINE: '',
  };

  count(status: ServerStatus): number {
    return this.servers.filter((s) => s.status === status).length;
  }

  pillClass(status: ServerStatus): string {
    return this.pillColors[status];
  }

  formatId(id: number): string {
    return '#ID' + id.toString().padStart(4, '0');
  }
}
