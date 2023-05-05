const mongoose = require('mongoose');


function serveLogin(req, res){
    res.render('login');
}

async function handleLogin(req, res){
    if(req.body.username && req.body.password){
        const user = await mongoose.model('User').findOne({
            username: req.body.username,
            password: req.body.password
        });
        // Check if the person with the correct credentiels exists or not.
        if(user){
            req.session.username = req.body.username;
            res.redirect('/dashboard');
            return;
        }else{
          res.redirect('/login');
          return;
        }
    }
}

function handleLogout(req, res){
    req.session.destroy();
}

module.exports = {
    serveLogin,
    handleLogin,

    handleLogout
}