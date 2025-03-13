const express = require('express');
const router = express.Router();
const authController = require('../controllers/aurh.controller');

router.post('/auth/login', authController.login);
module.exports = router;