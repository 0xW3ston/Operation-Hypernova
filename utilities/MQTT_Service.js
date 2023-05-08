const mqtt = require('mqtt');
const { insertData } = require('../models/Data');
const { getDeviceByAUTH_ID } = require('../models/Device');
const emitter = require('../controllers/tradeMarket');

const mqtt_client = mqtt.connect({
    host: process.env.MQTT_URL,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS
  });

mqtt_client.on('connect',()=>{
    console.log("connected mqtt");
    mqtt_client.subscribe("$DATA/#");
});

const RandomValue = () => {return parseInt(Math.random() * 100)};

setInterval(()=>{
    mqtt_client.publish('$DATA/MalcolmX/ARD01',`${RandomValue()};${RandomValue()}`);
    mqtt_client.publish('$DATA/DonaldTrump/ARD04',`${RandomValue()};${RandomValue()}`);
},2000);

mqtt_client.on('message',async (topic,msg) => {
    console.log("intercepted new data")
    const timestamp = new Date();
    const [_,username,AUTH_ID] = topic.split('/');
    const [Temperature, Humidity] = msg.toString().split(';');
    const device_id = await getDeviceByAUTH_ID(AUTH_ID);
    emitter.emit("new-data",{AUTH_ID:AUTH_ID,Temperature:parseInt(Temperature),Humidity:parseInt(Humidity),time:timestamp});
    insertData(device_id,Temperature,Humidity);
})

module.exports = mqtt_client;