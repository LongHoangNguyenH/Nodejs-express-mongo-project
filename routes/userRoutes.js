const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userControllers');
const validToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post("/register",registerUser );

router.post("/login", loginUser);

router.get("/current",validToken, currentUser );


module.exports = router;