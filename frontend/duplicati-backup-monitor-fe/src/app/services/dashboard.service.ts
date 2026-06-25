import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ServerStatus = 'OK' | 'WARNING' | 'ERROR' | 'UNKNOWN' | 'OFFLINE';

export interface ServerCard {
  id: number;
  name: string;
  status: ServerStatus;
}

export interface BackupSummary {
  ok: number;
  warning: number;
  error: number;
  unknown: number;
}

export interface DashboardData {
  servers: ServerCard[];
  summary: BackupSummary;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api';

  getDashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/dashboard`);
  }
}
