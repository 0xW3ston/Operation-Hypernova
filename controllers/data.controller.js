const { Personne, Device, Data } = require('../models');
const { getUserCache, addUserCache} = require('../models/cache/usersCache');

const verifyLogin = async (req, res) => {
  // Disconnect Button
  console.log(req.session);
  //
  if(req.body.disconnect){
    req.session.destroy();
  };
  // if(req.session.username){
  //   res.redirect('/home');
  // }
  // If Trying to Log In
  if(req.body.username && req.body.password){
    let start = process.hrtime();
    const persCache = getUserCache(req.body.username);
    let stop = process.hrtime();
    console.log("Cache" + "   " + (stop[0] - start[0]) + "  " + (stop[1] - start[1]));
    if(persCache && persCache === req.body.password){
      req.session.username = req.body.username;
      res.redirect('/home');
      return;
    }
    start = process.hrtime();
    const personne = await Personne.findOne({
        username: req.body.username,
        password: req.body.password
    });
    stop = process.hrtime();
    console.log("DB" + "   " + (stop[0] - start[0]) + "  " + (stop[1] - start[1]));
    if(personne){
        addUserCache(req.body.username,req.body.password);
        req.session.username = req.body.username;
        res.redirect('/home');
        return;
    }else{
      res.redirect('/login');
      return;
    }
  }else{
    res.redirect('/login');
    return;
  }
};

const showLogin = (req,res) => {
  if(req.session.username){
    res.redirect('/home');
  }else{
    res.render('login');
  }
}

const showHome = async (req, res) => {
  if(req.session.username){
    const username = req.session.username;
    res.render('dashboard',{username: username});
  }else{
    res.redirect('/login');
  }
};

const showDevices = async (req, res) => {
  if(req.session.username){
    const username = req.session.username;
    const devices = await Device.find({
      username: username
    },{
      _id:0,
      AUTH_ID:1
    });
    res.render('devices',{username:username,devices:devices});
  }else{
    res.redirect('/login');
  }
};

const showDevice = (req,res) => {
    if(req.session.username){
        const username = req.session.username;
        const { AUTH_ID } = req.params;
        res.render('device',{AUTH_ID:AUTH_ID,username:username})
    }else{
        res.send("You Are not Logged On.");
    }
}

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

module.exports = {
  verifyLogin,
  showLogin,
  showHome,
  showDevices,
  showDevice,
  handleHttp,
  handleMqtt
};