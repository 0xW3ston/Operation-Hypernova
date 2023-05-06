const authC = require('../controllers/auth.controller');
const loginMidl = require('../middlewares/authN').loggedIn;
const { Router } = require('express');
const router = Router();

router.get('/login',authC.serveLogin);
router.post('/login',authC.handleLogin);

router.get('/logout',authC.handleLogout,loginMidl);

module.exports = router;