var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(7);

const hashPass = (newPass)=>{
    return bcrypt.hashSync(newPass, salt);
}

const verifyPass = (password, hashedPass)=>{
    return bcrypt.compareSync(password, hashedPass);
}

module.exports={
    hashPass,
    verifyPass
}