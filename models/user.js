var uniqid = require('uniqid');

// TODO run password through hash
function newUser(userVals){
    const newUserModel={
        "_id": userVals._id,
        "password" : userVals.password,
        "username" : userVals.username,
        "displayName" : userVals.displayName,
        "friends": [],
        "recipes" : {}
    }
    return newUserModel;
}
module.exports = newUser;