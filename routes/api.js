/*
ICI L'AFFICHAGE S'EFFECTUE EN RES.RENDER. LES FICHIERS SONT INTERPRETÉS ET ENVOYÉS,
CONTRAIREMENT AU ROUTES APIHTML ET FRONTHTML QUI RENVOIENT DES DONNES JSON A INTERPRETER PAR LE CLIENT
*/

/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;

const bodyParser = require('body-parser');

//

/**
 * Parse request
 */
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
//


/**
 * 
 * Configuration de Mongoose
 */
const mongoose = require('mongoose');
// my-recipes est le nom de la base MongoDB utilisée
const mongoServeur = 'mongodb://localhost:27017/my-recipes';
//

/*
Définition des routes
*/
// Accueil de l'API
router.get('/', (req, res) => {
    // Message affiché lors de l'appel de route API
    res.json({
        msg: 'Hello from API'
    });
});

// GET
// Afficher la collection de données (recettes) lors de l'appel de api/my-recipes
router.get('/my-recipes', (req, res) => {

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
                    res.json({
                        error: err
                    })
                } else {
                    //Collection récupérée
                    res.json(collection);
                }
            })
        };

        //Fermer la connexion
        db.close();

    })

});

// POST
//Créer une route API pour ajouter un article : post /api/add-recipe
router.post('/add-recipe', (req, res) => {
    console.log(req.body.title);
    mongoose.connect(mongoServeur, (err, db) => {
        //Tester ma connexion
        if (err) {
            res.render('add-recipes', {
                msg: err
            })
        } else {
            let title = req.body.title,
            content = req.body.content,
            ingredients = req.body.ingredients;
            let array_ing = ingredients.split(',');

            // // //Connexion ouverte : ajouter les données dans la BDD
            db.collection('recipes').insert({
                title: title,
                content: content,
                ingredients: array_ing,

            }, (err, newObject) => {
                //Verifier l'ajout
                if (err) {
                    res.redirect(500, '/')
                } else {
                    res.redirect(301, '/')
                }
            })
        };
        
        //Fermer la connexion
        db.close();
        
    })
})
//

// GET
// Créer une route API pour afficher une recette suivant un ID : /api/recipe/id
router.get('/recipe/:_id', (req, res) => {
    console.log(req.params._id);
    mongoose.connect(mongoServeur, (err, db) => {
        //Tester ma connexion
        if (err) {
            res.render('recipe-detail', {
                msg: err
            })
        } else {
            //Connexion ouverte : récupérer la collection de données
            db.collection('recipes').find({
                _id: new ObjectId(req.params._id)
            }).toArray((err, collection) => {

                //tester la connexion de la collection
                if (err) {
                    res.render('recipe-detail', {
                        error: err
                    })
                } else {
                    //Collection récupérée
                    //res.json(collection);

                    // Collection récupérée :Renvoyer le fichier index dans la réponse avec la collection
                    res.render('recipe-detail', {
                        data: collection
                    });
                }
            })
        };

        //Fermer la connexion
        db.close();

    })
})
//

// POST
//Créer une route API pour supprimer un article : formulaire post sur /api/suppr-recipe/id
router.post('/suppr-recipe/:id', (req, res) => {
    console.log(req.params.id);
    mongoose.connect(mongoServeur, (err, db) => {
        //Tester ma connexion
        if (err) {
            res.render('suppr-recipe', {
                msg: err
            })
        } else {
            //Connexion ouverte : supprimer les données dans la BDD
            db.collection('recipes').remove({
                _id: new ObjectId(req.params.id)
            }, (err, newObject) => {
                //Verifier LA SUPPRESSION
                if (err) {
                    res.redirect(500, '/')
                } else {
                    res.redirect(301, '/')
                }
            })
        };

        //Fermer la connexion
        db.close();

    })
})
//






/*
Exporter le module de route
*/
module.exports = router;
//