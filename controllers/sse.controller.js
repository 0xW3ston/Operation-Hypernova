const mqtt_client = require("../utilities/MQTT_Service");
const emitter = require("./tradeMarket");

const handleMqtt = async (res,topic, message) => {
  const timestamp = new Date();
  const [_,username,AUTH_ID] = topic.split('/');
  const [Temperature, Humidity] = message.toString().split(';');
  // Get Device ID (_id);
  res.write('data: ' + JSON.stringify({AUTH_ID:AUTH_ID,Temperature:parseInt(Temperature),Humidity:parseInt(Humidity),time:timestamp}) + '\n\n')
}


function serveRealTimeData_Admin(req,res){
    
    var allData = true;
    var device_id;
    var AUTH_ID;
    var stop;
    console.log(req.headers);
    if(req.query && req.query['AUTH_ID']){
      allData = false;
      AUTH_ID = req.query['AUTH_ID'];
      // device_id = req.headers['device_id'];
      // AUTH_ID =  req.headers['device_AUTH_ID'];
    }
    
    function filterData(data,req,res){
      console.log(allData);
      if(stop){
        return;
      }
      if(allData){
        res.write('data: ' + JSON.stringify(data) + '\n\n')
      }else{
        console.log(req.query['AUTH_ID']+ "   " + data.AUTH_ID);
        if(req.query['AUTH_ID'] == data.AUTH_ID){
          res.write('data: ' + JSON.stringify(data) + '\n\n')
        }
      }
    }

    // [SSE: Server-Side Events Initiatilization] 
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client


    // [NodeJS : EventEmitter ]
    emitter.on('new-data',(data) => {
      if(stop){
        return;
      }
      filterData(data,req,res);
    })

    // mqtt_client.on('message',(topic,msg) => {
    //   const [_,username,AUTH_IDd] = topic.split('/');
    //   if(!allData){
    //     if(AUTH_IDd == AUTH_ID){
    //       handleMqtt(res,topic,msg);
    //     }
    //   }else{
    //     handleMqtt(res,topic,msg);
    //   }
    // });
    
    res.on('close', () => {
      console.log('client dropped me');
      stop = true;
      res.end();
    });
    // res.write('data: ' + JSON.stringify({message: 'Hello, world!',temperature:10,humidity:12}) + '\n\n');
}

module.exports = {
    serveRealTimeData_Admin
}