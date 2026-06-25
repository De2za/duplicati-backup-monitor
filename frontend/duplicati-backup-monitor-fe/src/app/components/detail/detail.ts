import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackupService, BackupData, Server } from '../../services/backup.service';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerDetail implements OnInit {
  serverId: number | null = null;
  server: Server | null = null;
  backups: BackupData[] = [];
  expandedBackupId: string | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private backupService: BackupService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.serverId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Extracted serverId:', this.serverId);
    if (this.serverId) {
      this.loadServerAndBackups();
    }
  }

  loadServerAndBackups(): void {
    if (!this.serverId) return;

    this.loading = true;
    this.error = null;

    this.backupService.getServerDetail(this.serverId).subscribe({
      next: (data) => {
        console.log('Dati ricevuti:', data);
        this.server = data.server;
        this.backups = data.backups;
        this.loading = false;
        this.cdr.markForCheck();
        console.log('Loading set to false');
        console.log('Server:', this.server);
        console.log('Backups:', this.backups);
      },
      error: (err: any) => {
        console.log('Errore:', err);
        this.error = 'Errore caricamento dati server';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  toggle(backupId: string): void {
    this.expandedBackupId = this.expandedBackupId === backupId ? null : backupId;
  }

  isExpanded(backupId: string): boolean {
    return this.expandedBackupId === backupId;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'OK':
        return 'border-verde-ok';
      case 'WARNING':
        return 'border-arancione-warning';
      case 'ERROR':
        return 'border-rosso-error';
      case 'UNKNOWN':
        return 'border-viola-unknown';
      default:
        return 'border-grigio-offline';
    }
  }

  getStatusBgColor(status: string): string {
    switch (status) {
      case 'OK':
        return 'bg-verde-ok';
      case 'WARNING':
        return 'bg-arancione-warning';
      case 'ERROR':
        return 'bg-rosso-error';
      case 'UNKNOWN':
        return 'bg-viola-unknown';
      default:
        return 'bg-grigio-offline';
    }
  }
}