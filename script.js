document.getElementById('tracking-link').addEventListener('click', function(event) {
    event.preventDefault();  // Empêche le comportement par défaut du lien
    alert("Suivi activé.");   // Alerte pour confirmer l'activation

    // Écoute les clics sur le document
    document.addEventListener('click', function(e) {
        let action = {
            type: 'click',
            x: e.clientX,
            y: e.clientY,
            element: e.target.tagName,
            timestamp: new Date().toISOString()
        };
        sendAction(action);  // Envoie l'action au serveur
    });

    // Écoute les frappes de touches
    document.addEventListener('keydown', function(e) {
        let action = {
            type: 'keypress',
            key: e.key,
            timestamp: new Date().toISOString()
        };
        sendAction(action);  // Envoie l'action au serveur
    });
});

// Fonction pour envoyer les actions au serveur
function sendAction(action) {
    fetch('http://localhost:3000/enregistrer-actions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi de l\'action');
        }
        console.log('Action envoyée:', action);
    })
    .catch(error => console.error('Erreur d\'envoi:', error));
}
