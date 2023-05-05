const chalk = require('chalk');
const logger = require('morgan');
const express = require('express');
const session = require('express-session');
const app = express();

// Set Up Rate-Limiting System:
const cacheNode = require('node-cache');
const MainCache = new cacheNode();
const maxRequestsPerSecond = 4;
const rateLimitDuration = 1; // In seconds

function isRateLimited(ip) {
  const key = `rate-limit:${ip}`;
  const count = MainCache.get(key) || 0;
  if (count >= maxRequestsPerSecond) {
    banIP(ip);
    console.log(chalk.greenBright("Banned IP: " + ip))
    return true;
  }

  MainCache.set(key, count + 1, rateLimitDuration);
  console.log(count);
  return false;
}

function banIP(ip) {
  const key = `ban:${ip}`;
  MainCache.set(key, true);
}

function rateLimitAndBanMiddleware(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (MainCache.get(`ban:${ip}`)) {
    res.statusCode = 403;
    res.redirect('http://www.google.com');
    return;
  }

  if (isRateLimited(ip)) {
    res.statusCode = 429;
    res.send("no")
    return;
  }

  next();
}


const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const controllers = require('./controllers/data.controller');

//
app.use(express.static('./public',{root:__dirname}))
app.set('view engine','ejs');
app.set('views','./views',{root:__dirname});

mongoose.connect('mongodb://127.0.0.1:27017/DB')
  .then(() => {
    console.log("Connected to DB");
  })

const mqtt_client = mqtt.connect('mqtt://localhost:1883/');

app.use(cors())


const server = app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

logger.format('FORMAT_MAIN', function (tokens, req, res) {
  const Now = new Date().toISOString();
  const date = Now.substring(11,19);
  const isBanned = MainCache.get(`ban:${req.ip}`);
  process.stdout.write('\x07');
  return [
    chalk.gray(date), // Add timestamp in gray
    ( !isBanned ? chalk.green(req.ip) : chalk.red.strikethrough(req.ip)),                  // Add client IP address in green
    chalk.yellow(tokens.method(req, res)),
    chalk.cyan(tokens.url(req, res)),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    chalk.magenta(tokens['response-time'](req, res)), 'ms' // Color response time in magenta
  ].join(' ');
});

app.use(logger('FORMAT_MAIN'))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session(
    {
      secret: 'secretsecret1112',
      resave: false,
      saveUninitialized: false
    }
));

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"]
  }
});

// app.use(rateLimitAndBanMiddleware);

app.get('/',(req,res)=>{
  res.redirect('/login');
});

app.get('/login',controllers.showLogin);
app.post('/login',controllers.verifyLogin);
app.get('/home',controllers.showHome);
app.get('/devices',controllers.showDevices);
app.get('/device/:AUTH_ID',controllers.showDevice);

// [ Handling HTTP API Endpoint: ]
app.post('/data',(req, res) => {
  controllers.handleHttp(io,req,res);
});

// [ Handling MQTT Endpoint: ]
mqtt_client.on('message',(topic, message) => {
  controllers.handleMqtt(io, topic, message)
});

io.on('connection',(socket)=>{
  const Room = socket.handshake.query.username + socket.handshake.query.AUTH_ID;
  if(Room){
    socket.join(Room);
  };
});

mqtt_client.on('connect',()=>{
  mqtt_client.subscribe("$DATA/#");
});

const RandomValue = () => {return parseInt(Math.random() * 100)};

setInterval(()=>{
    mqtt_client.publish('$DATA/MalcolmX/ARD01',`${RandomValue()};${RandomValue()}`);
    mqtt_client.publish('$DATA/DonaldTrump/ARD04',`${RandomValue()};${RandomValue()}`);
},5000);

app.use((req,res) => {
  console.log(chalk.greenBright.bold("<<= out of path attempt =>>"));
  res.redirect('http://www.google.com');
})

// let arduinoData = {};
// let buffer = {};
// var interval = 5000; // interval in milliseconds, e.g. 5 seconds

// io.on('connection', function (socket) {
//   console.log("connected");
//   socket.on('setDataInterval', function (data) {
//     console.log('Received data:', data);
//     interval = data * 1000;
//     clearInterval(timerId);
//     timerId = setInterval(function() {
//       // Loop through the buffer and emit the data
//       for (let arduinoNum in buffer) {
//         io.emit('message_mqtt', {
//           'Number': arduinoNum,
//           'msg': buffer[arduinoNum],
//           'time': buffer[arduinoNum].time
//         });
//       }
//       // Clear the buffer
//       buffer = {};
//     }, interval);
//     // Do something with the received data
//   });
// });

// app.get('/',(req,res) => {
//   res.redirect('/chartMqtt');
// })

// app.get('/graphMqtt',(req,res)=>{
//   res.sendFile("./pages/viewMqttGraph.html",{ root: __dirname });
// })

// app.get('/mqtt',(req,res)=>{
//   res.sendFile("./pages/viewMqtt.html", { root: __dirname });
// });

// app.get('/http',(req,res)=>{
//   res.sendFile("./pages/viewHttp.html", { root: __dirname });
// });

// app.get("/chartMqtt", function(req, res) {
//   res.render("viewMqttChart",{'devices':[1,2,3]});
//   // res.render('test',{name:"0xW3ston",company:"Evil Corp",vars:['a','b','c','d']});
// });

// //
// app.post('/http/data',(req,res)=>{
//   io.emit('message_http',req.body);
//   res.sendStatus(200);
// });

// mqtt_client.on('connect', function () {
//   console.log('Client connected');
//   // mqtt_client.subscribe('$DATA/Arduino/1');
//   mqtt_client.subscribe('$DATA/Arduino/1/Temperature');
//   mqtt_client.subscribe('$DATA/Arduino/1/Humidity');
//   mqtt_client.subscribe('$DATA/Arduino/2/Temperature');
//   mqtt_client.subscribe('$DATA/Arduino/2/Humidity');
//   mqtt_client.subscribe('$DATA/Arduino/3/Temperature');
//   mqtt_client.subscribe('$DATA/Arduino/3/Humidity');
// });

// setInterval(()=>{
//     let RandomValue = (Math.random() * 100);
//     mqtt_client.publish('$DATA/Arduino/1/Temperature',RandomValue.toString());
//     RandomValue = (Math.random() * 100);
//     mqtt_client.publish('$DATA/Arduino/1/Humidity',RandomValue.toString());
//     RandomValue = (Math.random() * 100);
//     mqtt_client.publish('$DATA/Arduino/2/Temperature',RandomValue.toString());
//     RandomValue = (Math.random() * 100);
//     mqtt_client.publish('$DATA/Arduino/2/Humidity',RandomValue.toString());
//     RandomValue = (Math.random() * 100);
//     mqtt_client.publish('$DATA/Arduino/3/Temperature',RandomValue.toString());
//     RandomValue = (Math.random() * 100);
//     mqtt_client.publish('$DATA/Arduino/3/Humidity',RandomValue.toString());
// },1000);

// let arduinoData = {};
// let buffer = {};
// var interval = 5000; // interval in milliseconds, e.g. 5 seconds

// io.on('connection', function (socket) {
//   console.log("connected");
//   socket.on('setDataInterval', function (data) {
//     console.log('Received data:', data);
//     interval = data * 1000;
//     clearInterval(timerId);
//     timerId = setInterval(function() {
//       // Loop through the buffer and emit the data
//       for (let arduinoNum in buffer) {
//         io.emit('message_mqtt', {
//           'Number': arduinoNum,
//           'msg': buffer[arduinoNum],
//           'time': buffer[arduinoNum].time
//         });
//       }
//       // Clear the buffer
//       buffer = {};
//     }, interval);
//     // Do something with the received data
//   });
// });

// io.on('disconnect',function(){
//   console.log("disconnected");
// })

// let timerId = setInterval(function() {
//   // Loop through the buffer and emit the data
//   for (let arduinoNum in buffer) {
//     io.emit('message_mqtt', {
//       'Number': arduinoNum,
//       'msg': buffer[arduinoNum],
//       'time': buffer[arduinoNum].time
//     });
//   }
//   // Clear the buffer
//   buffer = {};
// }, interval);

// mqtt_client.on('message', function (topic, message) {
//   // console.log('Received message on Arduino Number => ',topic.split('/')[2], 'and on topic ',topic, ':', message.toString());
//   var currentDate = new Date();
//   var hours = currentDate.getHours();
//   var minutes = currentDate.getMinutes();
//   var seconds = currentDate.getSeconds();
//   var time = hours + ":" + minutes + ":" + seconds;
//   const arduinoNum = topic.split('/')[2];
//   const dataType = topic.split('/')[3];
//   if (!arduinoData[arduinoNum]) {
//     arduinoData[arduinoNum] = {};
//   }
//   arduinoData[arduinoNum][dataType] = parseInt(message.toString());
//   if (arduinoData[arduinoNum]['Temperature'] && arduinoData[arduinoNum]['Humidity']) {
//     // Add the data to the buffer
//     buffer[arduinoNum] = {
//       'Temperature': arduinoData[arduinoNum]['Temperature'],
//       'Humidity': arduinoData[arduinoNum]['Humidity'],
//       'time': time
//     };
//     delete arduinoData[arduinoNum];
//   }
// });