const mongoose = require('mongoose');

function insertData(device_id, temp, hum){
    mongoose.model('Data').create({
        timestamp:new Date().toISOString(),
        device:device_id,
        temperature:temp,
        humidity:hum
    })
}

module.exports = {
    insertData
}