const mongoose = require('mongoose');


async function createSubscription(user_id,device_id,dateStart,dateEnd){
    await mongoose.model('Subscription').create({
        user:user_id,
        device:device_id,
        dateStart:dateStart,
        dateEnd:dateEnd
    });
}

async function deleteSubscriptionById(subscription_id){
    await mongoose.model('Subscription').deleteOne({
        _id:subscription_id
    });
}

async function getAllDevicesByUserId(subscriber_id){
    const allDevices = await mongoose.model('Subscription').find({
        user:subscriber_id
    });
    return allDevices;
}

module.exports = {
    createSubscription,
    deleteSubscriptionById,
    getAllDevicesByUserId
}