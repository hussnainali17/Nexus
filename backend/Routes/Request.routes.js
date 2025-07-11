const express = require('express');
const router = express.Router();
const collabController = require('../Controllers/Request.controller');

// Investor sends request
router.post('/send', collabController.sendRequest);

router.get('/status/:id', collabController.getRequestStatus);

// Entrepreneur views requests sent to them
router.get('/view/:entrepreneurId', collabController.getRequestsForEntrepreneur);

// Entrepreneur updates request status
router.patch('/update/:id', collabController.updateRequestStatus);


module.exports = router;
