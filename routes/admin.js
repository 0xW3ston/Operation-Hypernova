const adminC = require('../controllers/admin.controller');
const loginMidl = require('../middlewares/authN').loggedIn;
const { Router } = require('express');
const router = Router();

router.get('/profile',loginMidl);
router.post('/profile',loginMidl);

router.get('/dashboard',loginMidl);

router.get('/devices',loginMidl);

router.get('/device/:AUTH_ID',loginMidl);

module.exports = router;