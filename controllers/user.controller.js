const mongoose = require('mongoose');

// Profile
async function serveProfile(req,res){

}

async function updateProfile(req,res){
    
}

// Device
async function serveAllDevices(req,res){
    // Do a check where date_start and date_end
    const username = req.session.username;
    const devices = await mongoose.model('Subscription').find({
      username: username
    },{
      _id:0,
      AUTH_ID:1
    });
    res.render('devices',{username:username,devices:devices});
}

async function serveDevice(req,res){
    // Do a check where date_start and date_end
    const username = req.session.username;
    const { AUTH_ID } = req.params;
    const device = await mongoose.model('Subscription').findOne({
        username:username
    },{
        _id:0,
        AUTH_ID:1
    });
    if(device){
        res.render('device',{AUTH_ID:AUTH_ID,username:username});
    }  
}

// Dashboard
async function serveDashboard(req,res){
    const username = req.session.username;
    res.render('dashboard',{username: username});
}

module.exports = {
    serveProfile,
    updateProfile,

    serveDevice,
    serveAllDevices,

    serveDashboard
}