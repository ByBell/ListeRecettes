/*
Importer les dépendances
*/
// Composants
const express = require('express');
const path = require('path');
const ejs = require('ejs');

// Modules
const frontRoute = require('./routes/front');
const apiRoute = require('./routes/api');

// EN CAS D'UTILISATION DU RENDU WWW-HTML
// const frontRoute = require('./routes/frontHTML');
// const apiRoute = require('./routes/apiHTML');

//

/*
Initialiser le serveur
*/
// Configurer le serveur
const app = express();
const port = process.env.PORT || 8000;

// Configurer le dossier des vues client. Le dossier 'client' est ici renommé en 'www-html'
app.set('views', __dirname + '/www-ejs');
// app.set( 'views', __dirname + '/www-html' );
app.use(express.static(path.join(__dirname, 'www-ejs')));
// app.use( express.static(path.join(__dirname, 'www-html')) );

// Définir le moteur de rendu (ejs, répertoire 'www-ejs' ou html, répertoire 'www-html')
app.set('view engine', 'ejs');
// app.set( 'view engine', 'html')

// Configurer les routes (commenter plus haut pour basculer fichiers route api et Front HTML)
app.use('/', frontRoute);
app.use('/api', apiRoute);
//

/*
Lancer le serveur
*/
app.listen(port, () => console.log(`Le serveur est lancé sur le port ${port}`))
//