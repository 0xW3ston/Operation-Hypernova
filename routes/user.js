const userC = require('../controllers/user.controller');
const loginMidl = require('../middlewares/authN').loggedIn;
const { Router } = require('express');
const router = Router();

router.get('/profile',loginMidl);
router.post('/profile',loginMidl);

router.get('/dashboard',loginMidl,userC.serveDashboard);

router.get('/devices',loginMidl,userC.serveAllDevices);

router.get('/device/:AUTH_ID',loginMidl,userC.serveDevice);

module.exports = router;