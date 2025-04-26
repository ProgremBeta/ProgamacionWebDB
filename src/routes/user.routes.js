//Importa el manejo de peticiones las rutas, los controller, los roles, los middlewares de autenticacion y manejo de errores
const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, checkRole} = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

//Rutas para la gestion de los usuarios
router.post('/users/create',userController.createUser);
router.put('/users/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);
router.get('/users/', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);
router.delete('/users/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);
router.get('/users/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

//Para manejo de errores
router.use(errorHandler);

//Exporta las rutas para el manejo de usuarios
module.exports = router;