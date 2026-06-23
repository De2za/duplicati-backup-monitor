const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');

const port = 8080;

app.use(cors());
app.use(express.json());

/* 
    restituisce dati da visualizzare nella home page:
    numero di server totali, online, offline
    numero totale di backup e lo stato (ok, warning, error, unknown)
    ultimo aggiornamento dei dati
*/
app.get('/api/home', (req, res) => {

    const filePath = path.join(__dirname, 'data/summary.json'); // path del file

    res.sendFile((filePath), (err) => { 
        if (err) {
            console.error("errore invio file!");
            return res.status(500).json({ error: "file non trovato" });
        } else {
            console.log("file inviato con successo");
        }
    });

});

/* 
    restituisce dati da visulaizzare nella schermata dashboard con tutti i server:
    id del server, nome, host, url duplicati, stato e note
*/
app.get('/api/servers', (req, res) => {

    const filePath = path.join(__dirname, 'data/servers.json'); // path del file

    res.sendFile((filePath), (err) => { 
        if (err) {
            console.error("errore invio file!");
            return res.status(500).json({ error: "file non trovato" });
        } else {
            console.log("file inviato con successo");
        }
    });

});

/* 
    restituisce dati da visualizzare quando si clicca su un server specifico nella dashboard:
    id del server, nome, stato,
    lista backup con id, nome, schedule, stato, numero errori e warning e ultimo messaggio
*/
app.get('/api/servers/:id', async (req, res) => {

    const serverId = req.params.id; // id del server

    const filePathServer = path.join(__dirname, 'data/servers.json'); // path del file con i server
    const filePathBackups = path.join(__dirname, 'data/duplicati-backups.normalized.json'); // path del file con i backup

    let filteredBackups = [];
    let serverInfo;

    try {

        // leggo il file dei server per trovare quello con l'id richiesto
        const dataServer = await fs.readFile(filePathServer, 'utf8');
        const servers = JSON.parse(dataServer);
        serverInfo = servers.find(server => server.id == serverId); // cerco il server con l'id richiesto

        if (!serverInfo) { // se non trovo il server con l'id richiesto
            console.warn(`server ${serverId} non trovato`);
            return res.status(404).json({ error: "server non trovato" });
        }

        // leggo il file dei backup e filtro quelli che hanno come serverId quello richiesto
        const dataBackups = await fs.readFile(filePathBackups, 'utf8');
        const backups = JSON.parse(dataBackups);
        filteredBackups = backups.filter(backup => backup.serverId == serverId); // filtro i backup per serverId

        // invio la risposta con le informazioni del server e la lista dei backup filtrati
        return res.json({
            server: serverInfo,
            backups: filteredBackups
        });

    } catch (error) { // se c'è un errore nella lettura o parsing dei file
        console.error("errore nella lettura o parsing dei file!");
        return res.status(500).json({ error: "errore nella lettura o parsing dei dati" });
    }
 
});

app.listen(port, () => {
    console.log("inizio ascolto porta " + port);
});