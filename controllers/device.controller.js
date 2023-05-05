const mongoose = require('mongoose');

const handleHttp = (io, req, res) => {
    const time = new Date();
    const timestamp = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    if(req.body.username && req.body.AUTH_ID && req.body.AUTH_PASS && req.body.data){
        io.to((req.body.username + req.body.AUTH_ID)).emit('message',{'data':req.body.data,'time':timestamp});
        res.sendStatus(200);
    }else{
        res.sendStatus(401);
    }
    // Insert to Database Data
  }
  
const handleMqtt = (io,topic, message) => {
    const time = new Date();
    const timestamp = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    const [_,username,AUTH_ID] = topic.split('/');
    const [Temperature, Humidity] = message.toString().split(';');
    io.to(username + AUTH_ID).emit('message',{'data':{'Temperature':parseInt(Temperature),'Humidity':parseInt(Humidity)},'time':timestamp});
  // Insert to Database Data
}