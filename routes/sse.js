const sseC = require('../controllers/sse.controller');
const { Router } = require('express');
const router = Router();

// router.get('/device-sse',sseC.serveSensorData);
// router.get('/device-sse/:AUTH_ID',sseC.serveSensorData);

router.get('/device-sse-admin',sseC.serveRealTimeData_Admin);
router.get('/device-sse-admin/:AUTH_ID',sseC.serveRealTimeData_Admin);

module.exports = router;