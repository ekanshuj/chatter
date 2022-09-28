const express = require('express');
const router = express.Router();

const { createMessages, getMessages } = require('../controllers/messageController');

router.post('/newmsg', createMessages);
router.post('/allmsg', getMessages);


module.exports = router;