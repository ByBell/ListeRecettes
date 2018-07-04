/*
ICI L'AFFICHAGE S'EFFECTUE EN RES.RENDER. LES FICHIERS SONT INTERPRETÉS ET ENVOYÉS,
CONTRAIREMENT AU ROUTES APIHTML ET FRONTHTML QUI RENVOIENT DES DONNES JSON A INTERPRETER PAR LE CLIENT
*/

/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
//

/**
 * 
 * Configuration de Mongoose
 */

const mongoose = require('mongoose');
const mongoServeur = 'mongodb://localhost:27017/my-recipes';
//

/*
Définition des routes
*/
// On affiche une liste des recipes
router.get('/', (req, res) => {
    // Renvoyer le fichier index dans la réponse

    //Connextion à la base de données mongoDB
    mongoose.connect(mongoServeur, (err, db) => {
        //Tester ma connexion
        if (err) {
            res.json({
                error: err
            })
        } else {
            //Connexion ouverte : récupérer la collection de données
            db.collection('recipes').find().toArray((err, collection) => {

                //tester la connexion de la collection
                if (err) {
                    res.render('index', {
                        error: err
                    })
                } else {
                    //Collection récupérée
                    //res.json(collection);

                    // Collection récupérée :Renvoyer le fichier index dans la réponse avec la collection
                    res.render('index', {
                        data: collection
                    });
                }
            })
        };

        //Fermer la connexion
        db.close();

    })

});

/**
 * Créer une route pour ajouter des recipes
 */

router.get('/add-recipe', (req, res) => {
    res.render('add-recipe')
});



//
/*



Exporter le module de route
*/
module.exports = router;
//