const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');

// Define the login route
router.post('/login', loginController.loginUser);

module.exports = router;
