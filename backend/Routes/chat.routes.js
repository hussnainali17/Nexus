// routes/chat.route.js
const express = require('express');
const router = express.Router();
const Chat = require('../Models/Chat.model');
const ChatController = require('../Controllers/Chat.controller');


router.get('/getInteractedUsers/:userId', ChatController.getInteractedUsers);

router.post('/', ChatController.createChat);
// GET messages between two users
router.get('/:userId1/:userId2', ChatController.getMessage);




module.exports = router;
