var express = require('express');
var router = express.Router();
var db = require('../_db/db');
var recipeModel = require('../models/recipe');
var USERS = db.users;


// ** All recipe operations happen under the user id in JWT

// Creates new/updates current recipe 
router.post('/', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.newRecipes
    if(req.body.newRecipes && req.body.newRecipes.length > 0){
        try{
            USERS.findOne({"_id": req.user.userId}, (err, userDoc)=>{
                // If a user is found under that id
                if(userDoc){
                    // newRecipes is an array
                    var recipeList = req.body.newRecipes;
                    
                    // Creates update object from recipe array in req.body 
                    var newRecipes = {};
                    for(var recipeCount = 0; recipeCount < recipeList.length; recipeCount++){
                        var currentRecipe = recipeList[recipeCount]; 
                        // Set recipe ownerId's to id under JWT
                        currentRecipe.ownerId = req.user.userId;
                        // Parses only needed recipe info
                        var cleanedRecipe = recipeModel(currentRecipe);
                        var recipePointer = "recipes."+ cleanedRecipe.id;
                        newRecipes[recipePointer] = cleanedRecipe;
                    }

                    // Uses object generated from req.body.newRecipes 
                    // array to update user
                    var updateQuery = { $set: newRecipes};

                    USERS.update({"_id": userDoc._id}, updateQuery, (error, updateResult)=>{
                        if(err){
                            return res.status(550).send(error)
                        }
                        return res.status(200).send("Recipes update success"); 
                    });

                } else {
                    
                    return res.status(404).send("User not found.")
                }
            })
        } catch(err){
            console.log(err);
            return res.status(550).send("Database error: ", err);
        }
    } else {
        return res.status(400).send("'newRecipes' not set in request. Should be array of recipe objects.");
    }   
});
// Delete recipe
router.post('/delete', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.recipeIds
    if(req.body.recipeIds && req.body.recipeIds.length > 0){
        USERS.findOne({"_id": req.user.userId}, (err, userDoc)=>{
            if(userDoc){
                // Puts all id's into object for query
                var idsFromReq = req.body.recipeIds;
                var idsToDelete = {}
                for(var idCount = 0; idCount < idsFromReq.length; idCount++){
                    var currentId = idsFromReq[idCount];
                    var recipePointer = "recipes." + currentId;
                    
                    idsToDelete[recipePointer] = "";
                }
                
                // Uses extracted object for query
                var updateQuery = {
                    $unset: idsToDelete
                };
                
                // 
                USERS.update({"_id" : req.user.userId}, updateQuery, (err, updateResult)=>{
                    if(err) {
                        return res.status(550).send(err);
                    }
                    // TODO .status without a .send doesn't seem to register on the front end. 
                        // Look into that.
                    return res.status(200).send("Success");
                });
            } else {
                return res.status(404).send("Can't remove recipe. User not found.")
            }
        });
    } else {
        return res.status(400).send("'recipeIds' not correct. Must be an array of id strings.");
    }
});

module.exports = router;