const userC = require('../controllers/user.controller');
const loginMidl = require('../middlewares/authN').loggedIn;
const { Router } = require('express');
const router = Router();

router.get('/profile',loginMidl);
router.post('/profile',loginMidl);

router.get('/dashboard',loginMidl,userC.serveDashboard);

router.get('/devices',loginMidl,userC.serveAllDevices);

router.get('/device/:AUTH_ID',loginMidl,userC.serveDevice);

router.get('/test',(req,res) => {
    res.send(
    `<html>
        <body>
        </body>
        <script>
            const source = new EventSource('/device-sse-admin?AUTH_ID=ARD04');
            source.onmessage = (e) => {
                console.log(JSON.parse(e.data));
            }
        </script>
    </html>`
    )
})

router.get('/testAll',(req,res) => {
    res.send(
    `<html>
        <body>
        </body>
        <script>
            const source = new EventSource('/device-sse-admin');
            source.onmessage = (e) => {
                console.log(JSON.parse(e.data));
            }
        </script>
    </html>`
    )
})

module.exports = router;