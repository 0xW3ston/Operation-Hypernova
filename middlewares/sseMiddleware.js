const mongoose = require('mongoose');
const deviceModel = require('../models/Device');


async function validateSubscriber(req, res, next){
    const validation_token = req.headers['token'];
    const user = await mongoose.model('User').findOne({
        token:validation_token
    });
    if(user){
        next();
    }else{
        res.send('Lol No');
    }
}

async function validateAdmin(req, res, next){
    const validation_token = req.headers['token'];
    const user = await mongoose.model('User').findOne({
        token:validation_token
    });
    if(user && user['role'] == 'admin'){
        next();
    }else{
        res.send('Lol not an admin.');
    }
}

async function validateDevice(req, res, next){
    const { AUTH_ID } = req.query;
    const specificDevice = deviceModel.getDeviceByAUTH_ID(AUTH_ID)
    const validation_token = req.headers['subscriptionToken'];
    const activeSubscription = await mongoose.model('Subscription').findOne({
        token:validation_token,
        device:specificDevice['_id']
    });
    if(activeSubscription && activeSubscription.isActive()){
        req.headers['device_AUTH_ID'] = AUTH_ID;
        req.headers['device_id'] = specificDevice['_id'];
        next();
    }else{
        res.send('Lol no active subscription on said device')
    }
}

module.exports = {
    validateSubscriber,
    validateAdmin,
    validateDevice
}