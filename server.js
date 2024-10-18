// Importation des modules nécessaires
const express = require('express');
const fs = require('fs');
const app = express();

// Middleware pour analyser les données JSON
app.use(express.json());

// Route pour enregistrer les actions envoyées par le client
app.post('/enregistrer-actions', (req, res) => {
    const action = req.body;  // Récupère les données envoyées par le client
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(action)}\n`;

    // Enregistrer les actions dans le fichier 'actions.log'
    fs.appendFile('actions.log', logEntry, (err) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement des actions :', err);
            return res.status(500).send('Erreur du serveur');
        }
        res.status(200).send('Action enregistrée');
    });
});

// Démarre le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
npm install express
