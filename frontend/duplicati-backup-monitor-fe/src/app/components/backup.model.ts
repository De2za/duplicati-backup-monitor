// backup.model.ts
export interface Backup {
  id: string;
  status: 'ok' | 'error' | 'warning';
  data: string;
  expanded: boolean;
}