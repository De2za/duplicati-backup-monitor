const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const port = 8080;

app.use(cors());
app.use(express.json());

// restituisce tutti i server salvati
app.get('/api/servers', (req, res) => {

    const filePath = path.join(__dirname, 'data.json'); // path del file

    res.sendFile((filePath), (err) => { 
        if (err) {
            res.status(404); // restituisco errore in caso di fallito invio del file
            console.log("errore invio file!");
        } else {
            console.log("file inviato con successo");
        }
    });

});

// restituisce un server specifico
app.get('/api/servers/:id', (req, res) => {

    const serverId = req.params.id; // id del server
    const filePath = path.join(__dirname, 'data.json'); // path del file

    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {
            return res.status(404);
            console.error("errore nella lettura del file!");
        }

        try { // try per il parse del JSON
            const servers = JSON.parse(data); // parsing del file json
            const server = servers.find(server => server.id == serverId); // trovo il server con lo stesso ID di quello richiesto

            if(server) {
                res.json(server); // invio il json del oggeto server con l'id corrispondente
            } else {
                res.status(404); // restituisco errore in caso di ID non trovato
                console.log("id non trovato!");
            }
        } catch (parseError) { // in caso di errore nel parsing restituisco errore
            console.log("errore nel parsing JSON!");
            res.status(404);
        }
        
    });

});

app.listen(port, () => {
    console.log("inizio ascolto porta " + port);
});