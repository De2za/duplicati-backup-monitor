# Duplicati Backup Monitor

Applicazione per il monitoraggio dello stato dei backup Duplicati su più server.
È composta da due parti:

- **`backend/`** — API REST in Node.js / Express che serve i dati (server, backup, riepilogo dashboard).
- **`frontend/duplicati-backup-monitor-fe/`** — interfaccia web in Angular 21 (SSR).

## Requisiti

- Node.js 20+ e npm

## Avvio

### 1. Backend

```bash
cd backend
npm install
npm start
```

Il backend resta in ascolto su `http://localhost:8080`.

### 2. Frontend

In un secondo terminale:

```bash
cd frontend/duplicati-backup-monitor-fe
npm install
npm start
```

Il frontend è raggiungibile su `http://localhost:4200` e consuma l'API del backend
su `http://localhost:8080/api`.

## Endpoint API

| Metodo | Path                  | Descrizione                                              |
| ------ | --------------------- | -------------------------------------------------------- |
| GET    | `/api/home`           | Riepilogo per la home (numero server e backup per stato) |
| GET    | `/api/servers`        | Elenco di tutti i server                                 |
| GET    | `/api/servers/:id`    | Dettaglio di un server con la lista dei suoi backup      |
| GET    | `/api/dashboard`      | Dati aggregati per la dashboard (stato peggiore + totali)|

I dati sono attualmente serviti da file JSON statici in `backend/data/`.
