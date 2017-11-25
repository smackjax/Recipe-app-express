var express = require('express');
var db = require('../_db/db');
var router = express.Router();
var extractRecipes = require('../_functions/extractRecipes');

/* this route handles all user data */
// /getData - Compiles all data for sign in or app open
// /update-* Separate routes to update username, displayName, and password
// /delete - Deletes doc with _id of user id

router.post('/',(req, res)=>{
    const {user, body } = req;
    console.log("Request 'user' to user/: ", user);
    console.log("Request 'body' to user/: ", body);
    // req.user.userId(parsed from JWT)
    db.users.findOne({"_id": req.user.userId}, (err, userDoc)=>{
        if(userDoc){
            // User info to return
            var myInfo = {
                userId: userDoc._id,
                username: userDoc.username,
                email: userDoc.email,
                displayName: userDoc.displayName,
                recipes: userDoc.recipes
            };

            // Gets array of friend documents from friend ids(document _id's)
            getFriendsByIds(userDoc.friends)
            .then(friendObjsArr=>{
                // Holds info of each friend.
                var friendInfoObjs = [];
                for(var fC = 0; fC < friendObjsArr.length; fC ++){
                    var friend = friendObjsArr[fC];
                    if(friend._id !== userDoc._id){
                        var fInfoObj = {
                            userId: friend._id,
                            username: friend.username,
                            displayName: friend.displayName,
                            recipes: friend.recipes
                        };
                        friendInfoObjs.push(fInfoObj);
                    }
                } 
                // User and friend objects are the same format
                    // but friend objects are in array
                var returnObj ={
                    userInfo: myInfo,
                    friendsInfo: friendInfoObjs,
                }
                res.status(200).send(returnObj)
            }) // end 'then'
        } else {
            res.status(404).send("User not found")
        }
    });
});



router.put('/username', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    // req.body.newUsername
    if(!req.body.newUsername){
        return res.status(400).send("'newUsername' not sent");
    } else {
        var newUsername = req.body.newUsername.trim();
        if(newUsername !== ""){
            db.users.findOne({"_id": req.user.userId}, (err, foundDoc)=>{
                if(foundDoc){
                    if(foundDoc.password === req.body.password){
                        
                    } else {
                        res.status(401).send("Current password doesn't match")
                    }  
                } else {
                    res.status(400).send("User not found");
                }
            });
            db.users.update({'_id': req.user.userId}, 
            {$set: {"username": newUsername}}, 
                (err, updateResult)=>{
                    if(err) {
                        return res.status(550).send(err);
                    } else if(updateResult.nModified === 1){
                        return res.status(200).send(newUsername);
                    } else {
                        return res.status(551).send('Username name not updated.');
                    }
                }
            ); 
        } else {
            res.status(400).send("'newUsername' can't be empty");
        }
    }
});

router.put('/display-name', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    // req.body.newDisplayName

    if(!req.body.newDisplayName){
        return res.status(400).send("'newDisplayName' not sent");
    } else {
        var newDisplayName = req.body.newDisplayName.trim();
        if(newDisplayName !== ""){
            db.users.findOne({"_id": req.user.userId}, (err, foundDoc)=>{
                if(foundDoc){
                    if(foundDoc.password === req.body.password){
                        db.users.update({'_id': req.user.userId}, 
                        {$set: {"displayName": newDisplayName}}, 
                            (err, updateResult)=>{
                                if(err) {
                                    return res.status(550).send(err);
                                } else if(updateResult.nModified === 1){
                                    return res.status(200).send(newDisplayName);
                                } else {
                                    return res.status(551).send('Display name not updated.');
                                }
                            }
                        ); 
                    } else {
                        res.status(401).send("Current password doesn't match")
                    }  
                } else {
                    res.status(400).send("User not found");
                }
            });
        } else {
            res.status(400).send("'newDisplayName' can't be empty");
        }
    }
});

router.put('/email', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    // req.body.newEmail
    
    // check that input was sent
    if(!req.body.newEmail){
        return res.status(400).send("'newEmail' not sent");
    } else {
        // check that input isn't empty
        var newEmail = req.body.newEmail.trim();
        if(newEmail !== ""){
            // find user
            db.users.findOne({"_id": req.user.userId}, (err, foundDoc)=>{
                if(foundDoc){
                    // Check password sent with update
                    if(foundDoc.password === req.body.password){
                        // Finally update with new email
                        db.users.update({'_id': req.user.userId}, 
                        {$set: {"email": newEmail}}, 
                            (err, updateResult)=>{
                                if(err) {
                                    return res.status(550).send(err);
                                } else {
                                    return res.status(200).send(newEmail);
                                }
                            }
                        ); 
                    } else {
                        res.status(401).send("Current password doesn't match")
                    }     
                } else {
                    res.status(400).send("User not found");
                }
            });
        } else {
            res.status(400).send("'newEmail' can't be empty");
        }
    }
});

router.put('/password', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    // req.body.newPassword
    if(!req.body.newPassword || !req.body.password){
        return res.status(400).send("Both 'newPassword' and 'currentPassword' can not be empty");
    } else {
        db.users.findOne({"_id": req.user.userId}, (err, foundDoc)=>{
            if(foundDoc){
                if(foundDoc.password === req.body.password){
                    db.users.update({'_id': req.user.userId}, 
                    {$set: {"password": req.body.newPassword}}, 
                        (err, updateResult)=>{
                            if(err){
                                res.status(500).send(err);
                            } else if(updateResult.nModified === 1){
                                res.status(200).send('Updated password successfully');
                            } else {
                                res.status(500).send('Password not updated. No database errors, but not updated.');
                            }
                        }
                    ); 
                } else {
                    res.status(401).send("Current password doesn't match")
                }  
            } else {
                res.status(400).send("User not found");
            }
        });

        
    }
});

router.post('/check-password', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    const passToCheck = req.body.password;
    if(!passToCheck){
        return res.status(400).send("No password sent");
    } else {
        db.users.findOne({"_id": req.user.userId}, (err, foundDoc)=>{
            if(foundDoc){
                if(foundDoc.password === passToCheck){
                    res.status(204).send();
                } else {
                    res.status(401).send("Current password doesn't match")
                }
                
            } else {
                res.status(400).send("User not found");
            }
        });
    }
});

// Delete user
router.post('/close-account', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password

    const userId = req.user.userId;
    var idToDelete = userId.trim();
    var query = {"_id": userId};
    if(idToDelete !== ""){
        db.users.findOne(query, (err, userDoc)=>{
            if(userDoc){
                if(req.body.password === userDoc.password){
                    db.users.remove({'_id': userId}, true, (err, result)=>{
                        if(err){
                            return res.status(550).send(err);
                        } else if(result){
                            // TODO could use some better fact checking
                            return res.status(200).send('Deleted user');
                        } else {
                            return res.status(552).send("Problem deleting, but no errors");
                        }
                    });
                } else {
                    res.status(400).send("Wrong password");
                }
            } else { 
                res.status(404).send('No user with that id');
            }
        });
    } else {
        res.status(400).send("'userId' can't be empty")
    }
});


function getFriendsByIds(friendIdsArr){
    return new Promise((resolve, reject)=>{
        var query = {
            "_id" : {
                $in : friendIdsArr
            } 
        }
        db.users.find(query, (err, friendDocs)=>{            
            // If there is a user with that id
            if(friendDocs){
                resolve(friendDocs);
            } else {
                reject("No friends from ids");
            }
        }); // end db.find
    })
}



module.exports = router;
