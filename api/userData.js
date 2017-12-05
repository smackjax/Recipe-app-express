var express = require('express');
var db = require('../_db/db');
var router = express.Router();
var {verifyPass, hashPass} = require('../_bcrypt/funcs');
var extractRecipes = require('../_functions/extractRecipes');

/* this route handles all user data */
// /getData - Compiles all data for sign in or app open
// /update-* Separate routes to update username, displayName, and password
// /delete - Deletes doc with _id of user id

router.post('/',(req, res)=>{
    const {user, body } = req;
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
               return res.status(200).send(returnObj)
            }) // end 'then'
        } else {
            return res.status(404).send("User not found")
        }
    });
});

var findUserFromJWT = (req, res, callback)=>{
    // Finds user based on req.user.userId (from expressJWT)
    if(req.user.userId){
        db.users.findOne({"_id": req.user.userId}, (err, foundDoc)=>{
            if(err){
                return res.status(550).send("Database error: " + err);
            } else if(foundDoc){
                return callback(req, res, foundDoc);
            } else {
                return res.status(404).send("User not found");
            }
        });
    } else {
        // This shouldn't happen, 
        // any routes needing verification should be caught higher.
        // But like they say:
        // "Safety is no accident" 
        return res.status(401).send("No JWT or no userId in JWT");
    }
}
// Checks stored user password against req.body.password
var verifyRequestPassword = (req, res, userData, callback)=>{
    // Checks for sent password
    if(!req.body.password.trim()){
        return res.status(400).send("No password sent");
    } else {
        var reqPass = req.body.password;
        if(verifyPass(reqPass, userData.password)){
            callback(req, res, userData);
        } else {
            return res.status(401).send("Incorrect password");
        }
    }
}
// Finds user based on JWT and req.body.password
var findUserAndVerifyPass = function(req, res, callback){
    // Passes arguments (req, res, userData) to callback
    var checkPass = (req, res, userData)=>{
        verifyRequestPassword(req, res, userData, callback);
    }; 
    return findUserFromJWT(req, res, checkPass);
};




// Updates user doc prop
var updateDbUserDocByPassword = function(req, res, docProp, newValue){
    var dbUpdateQuery = (req, res, foundDoc)=>{
        db.users.update(
            // Doc to update
            {'_id': foundDoc._id}, 
            // Prop : value to set
            {$set: {[docProp]: newValue}}, 
            // Callback from database action
            (err, updateResult)=>{
                if(err) {
                    return res.status(550).send("Database error: ", err);
                } else {
                    var msg = "Updated " + docProp +
                        " successfully";
                    return res.status(200).send(msg);
                }
            }
        );
    };
    return findUserAndVerifyPass(req, res, dbUpdateQuery)
};


router.put('/username', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    // req.body.newUsername
    var newUsername = req.body.newUsername.trim();
    if(!newUsername){
        return res.status(400).send("'newUsername' not sent");
    } else {
        // Function handles user retrieval
        // and verification by password
        updateDbUserDocByPassword(
            req,
            res,
            "username", 
            newUsername
        );
    }
});

// Updates 'displayName'
router.put('/display-name', (req, res)=>{
    var newDisplayName = req.body.newDisplayName.trim();
    if(!newDisplayName){
        return res.status(400).send("'newDisplayName' not sent");
    } else {
        updateDbUserDocByPassword(
            req,
            res,
            "displayName", 
            newDisplayName
        );
    }
});


// Updates 'email'
router.put('/email', (req, res)=>{    
    var newEmail = req.body.newEmail.trim();
    if(!req.body.newEmail){
        return res.status(400).send("'newEmail' not sent");
    } else {
        updateDbUserDocByPassword(
            req,
            res,
            "email", 
            newEmail
        );
    }
});

// Updates 'password'
router.put('/password', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    // req.body.newPassword
    if(!req.body.newPassword.trim() || !req.body.password.trim() ){
        return res.status(400).send("Both 'newPassword' and 'currentPassword' can not be empty");
    } else {
        // This uses it's own 'set' function to 
        // save the hashing until it is definitely required
        var updateUserPassword = (req, res, userData)=>{
            var newPass = 
                hashPass(req.body.newPassword);
            db.users.update(
                {'_id': userData._id}, 
                {$set: {"password": newPass}}, 
                (err, updateResult)=>{
                    if(err){
                        res.status(550).send(err);
                    } else{
                        res.status(200).send('Updated password');
                    }
                }
            ); 
        }
        findUserAndVerifyPass(req, res, updateUserPassword)
    }
});

router.post('/check-password', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    const passToCheck = req.body.password;
    if(!passToCheck){
        return res.status(400).send("No password sent");
    } else {
        var sendConfirm = (req, res, userData)=>{
            // If it gets this far, there is a user
            // and password is confirmed,
            // so just send good code
            return res.status(200).send();
        }
        findUserAndVerifyPass(req, res, sendConfirm);
    }
});

// Delete user
router.post('/close-account', (req, res)=>{
    // req.user.userId(parsed from JWT)
    // req.body.password
    var deleteUserDoc = (req, res, userData)=>{
        db.users.remove({'_id': userData._id}, true, (err, result)=>{
            if(err){
                return res.status(550).send(err);
            } else {
                return res.status(200).send('Deleted user');
            }
        });
    }
    return findUserAndVerifyPass(req, res, deleteUserDoc);
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
