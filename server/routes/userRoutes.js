const router = require('express').Router();

const { showUsers, registerUsers, authUsers } = require('../controllers/userController');
const { validateToken } = require('../middlewares/authJWT');

router.get("/:id", validateToken, showUsers);
router.post("/signup", registerUsers);
router.post("/login", authUsers);

module.exports = router;