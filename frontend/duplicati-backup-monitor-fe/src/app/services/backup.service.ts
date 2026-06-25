import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Server {
  id: number;
  name: string;
  host: string;
  duplicatiUrl: string;
  status: 'ONLINE' | 'OFFLINE';
  note: string;
}

export interface BackupData {
  id: string;
  serverId: number;
  name: string;
  schedule: string;
  lastRunDate: string;
  lastFinishDate: string | null;
  status: 'OK' | 'WARNING' | 'ERROR' | 'UNKNOWN';
  warnings: number;
  errors: number;
  lastMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(`${this.apiUrl}/servers`);
  }

  getServerDetail(serverId: number): Observable<{server: Server, backups: BackupData[]}> {
    return this.http.get<{server: Server, backups: BackupData[]}>(`${this.apiUrl}/servers/${serverId}`);
  }
}