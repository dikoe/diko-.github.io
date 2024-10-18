const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur notre page de suivi !</h1><a href="/track">Suivre vos actions</a>');
});

app.get('/track', (req, res) => {
    const logEntry = `Utilisateur a cliqué sur le lien à ${new Date().toISOString()}\n`;
    fs.appendFile('logs.txt', logEntry, (err) => {
        if (err) {
            console.error('Erreur d\'écriture dans le fichier', err);
            res.status(500).send('Erreur d\'écriture dans le fichier.');
            return;
        }
        console.log('Log ajouté avec succès.');
    });
    res.send('Merci d\'avoir cliqué ! Vos actions sont suivies.');
});

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

