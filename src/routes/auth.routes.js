//Se importan las librerias expres para permitir el manejo de rutas y otros archivos
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//Se usa esta ruta para hacer el login
router.post('/auth/login', authController.login);

//se exporta la ruta para hacer el login
module.exports = router;