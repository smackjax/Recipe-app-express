var express = require('express');
var router = express.Router();
var db = require('../_db/db');
var extractRecipes = require('../_functions/extractRecipes');
var USERS = db.users;


/* Handles following and unfollowing 'friends' */

// Follow(returns all friend info on success)
router.post('/', (req, res)=>{

    // req.user.userId(parsed from JWT)
    // req.body.friendUsername
    console.log("Add friend body: ", req.body);
    if(req.body.friendUsername){
        var newFriendUsername = req.body.friendUsername;
        var query = {"username" : newFriendUsername};

        USERS.findOne(query, (err, friendDoc)=>{
            if(friendDoc){
                // $addToSet only adds username if it isn't there
                var updateQuery = { $addToSet: { "friends" : friendDoc._id } };
                // Friend.recipes is an object, not array
                var friendInfo = {
                    userId: friendDoc._id,
                    username: friendDoc.username,
                    displayName: friendDoc.displayName,
                    recipes: friendDoc.recipes
                }
                // Updates 'friends' array under user id
                USERS.update({"_id": req.user.userId}, updateQuery, (err, result)=>{
                    if(err){

                    } else if(result.nModified === 1){                      
                        // If update successful, returns friend info
                        return res.status(200).json(friendInfo)
                    } else {
                        // If update not successful, send message
                        var msg = "User was not updated" + 
                            (err ? ( ". Database error: " + err ) : 
                                " (possibly already following)");
                        return res.status(409).send(msg);
                    }
                });
            } else {
                return res.status(404).send("User not found");
            }
        });
    } else {
        return res.status(400).send("No 'friendUsername' sent to search")
    }
});

// Unfollow (Deletes friend id from userId.friends)
router.post('/delete', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.friendIds
    if(req.body.friendIds){
        var query = {"_id" : req.user.userId};
        var updateQuery = {$pull : { "friends": {$in : req.body.friendIds} }};
        USERS.update(query, updateQuery, (err, result)=>{
            if(err){
                return res.status(500).send("Database err: ", err);
            } else if(result.nModified === 1){
                return res.status(200).send("Stopped following succesfully");
            } else {
                var msg = "Database didn't update doc, but no errors";
                return res.status(500).send(msg)
            }
        });
    } else {
        return res.status(400).send("'friendIds' not correct. Must be an array of strings.");
    }
    
});


module.exports = router;
