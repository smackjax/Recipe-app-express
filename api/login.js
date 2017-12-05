var express = require('express');
var router = express.Router();
var db = require('../_db/db');
var uniqid = require('uniqid');
var jwt = require('jsonwebtoken');
var JWTSecret = require('../_jwt/secret');

/* API creates new users, logs in existing. 
If successful, both return a JWT with payload of {userId: (new id or existing)} */

// Create new
router.post('/new-user', (req, res)=>{
    // req.body.username
    // req.body.displayName
    // req.body.password
    var rUsername = req.body.username || '';
    var rDisplayName = req.body.displayName || '';
    var rPassword = req.body.password || '';
    var rEmail = req.body.email || '';

    if( !rUsername.trim() || !rDisplayName.trim()  || !rPassword.trim() || !rEmail.trim() ){
        return res.send(400, "Username, display name, email, or password was empty");
    };

    db.users.findOne({"username": req.body.username}, (err, foundDoc)=>{
        if(foundDoc){
            return res.send(422, 'Username taken.');
        } else {
            var newUserId = uniqid("u-");
            var newUser = {
                "_id" : newUserId,
                username: rUsername,
                email: rEmail,
                displayName: rDisplayName,
                password: rPassword,
                friends: [],
                recipes: {}
            };
            db.users.insert(newUser, (err, result)=>{
                // Check for errors
                if(!err){
                    // If no errors, return JWT id
                    var newToken = jwt.sign({"userId": newUserId}, JWTSecret);
                    var userInfo =  {
                            token: newToken,
                            userId: newUser._id,
                            email: newUser.email,
                            username: newUser.username,
                            displayName: newUser.displayName
                        }
                    return res.status(200).json(userInfo);
                } else {
                    return res.status(550).send("Couldn't add user: " + err);
                }
            });
        }
    });
});

// Login existing
router.post('/existing', (req, res)=>{
    // req.body.username
    // req.body.password
    var username = req.body.username;

    db.users.findOne({"username": username}, (err, foundUser)=>{
        if(foundUser){    
            if(req.body.password === foundUser.password){
                // generate token
                // add token to user
                // (if successful) return token
                
                var newToken = jwt.sign({"userId": foundUser._id}, JWTSecret);
                var userInfo = {
                    token: newToken,
                    userId: foundUser._id,
                    email: foundUser || "(No email)",
                    username: foundUser.username,
                    displayName: foundUser.displayName
                }
                
                return res.status(200).json(userInfo);
            } else {
                return res.status(401).send("Wrong password");
            }
        } else {
            return res.status(404).send("No user found");
        }
    });
});

router.post('/check-username', (req, res)=>{
    // req.body.username
    const nameToCheck = req.body.username;
    if(nameToCheck){
        db.users.findOne({"username": nameToCheck}, (err, foundUser)=>{
            if(foundUser){
                return res.status(409).send("username taken");
            } else {
                return res.status(204).send("username available");
            }
        });
    } else {
        return res.status(400).send("'username' empty");
    }
    
});

router.post('/logout', (req, res)=>{
    // Nothing needs to be done on the server, 
    // but this is useful for the service worker.
    // If something is added to logout logic, 
    // should probably use a different(validated) route
    return res.status(200).send("Logged out");
});
module.exports = router;