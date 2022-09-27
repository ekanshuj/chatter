const express = require('express');
const router = express.Router();

const { showUsers, registerUsers, authUsers } = require('../controllers/userController');
const { validateToken } = require('../middleware/authJWT');

router.get('/:id', validateToken, showUsers);
router.post('/signup', registerUsers);
router.post('/login', authUsers);


module.exports = router;