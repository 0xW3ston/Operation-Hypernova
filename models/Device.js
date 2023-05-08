const mongoose = require('mongoose');

async function createDevice(AUTH_ID,AUTH_PASS,name){
    await mongoose.model('Device').create({
        AUTH_ID,
        AUTH_PASS,
        name
    })
}

async function deleteDeviceByAUTH_ID(AUTH_ID){
    await mongoose.model('Device').deleteOne({
        AUTH_ID
    })
}

async function getDeviceByAUTH_ID(AUTH_ID){
    const device = await mongoose.model('Device').findOne({
        AUTH_ID:AUTH_ID
    });
    return device;
}


module.exports = {
    createDevice,
    deleteDeviceByAUTH_ID,
    getDeviceByAUTH_ID
}