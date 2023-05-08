const mongoose = require('mongoose');
const crypto = require('crypto');

function sha256(text) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
  }



async function createUser(username, password, email){
    await mongoose.model('User').create({
        username,
        passwordHash:sha256(password),
        email:email,
        role:"user"
    });
}

async function deleteUserByUsername(username){
    await mongoose.model('User').remove({
        username:username
    });
}

async function updateUserByUsername(username, password, email){
    await mongoose.model('User').updateOne({
        username: username
    },{
        $set:{
            username,
            ...(password && {passwordHash:sha256(password)}),
            email:email
        }
    });
}

async function findUserByUsername(username){
    const result = await mongoose.model('User').findOne({
        username
    });
    return result;
}

module.exports = {
    createUser,
    deleteUserByUsername,
    updateUserByUsername,
    findUserByUsername
}