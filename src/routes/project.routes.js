//Se exporta el modulo de express, el router, el controlador de proyectos, Roles,  los middlewares de autenticacion,  manejo de errores
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const ROLES = require('../utils/constants');
const {authenticateToken, checkRole} = require('../middlewares/auth.middleware');
const errorHandler = require('../middlewares/error.middleware');

console.log('ROLES:', ROLES);

//Rutas para gestion de los proyectos
router.post('/project/create', authenticateToken,checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/project/update/:id', authenticateToken,checkRole([ROLES.ADMIN]), projectController.updateProject);
router.delete('/project/delete/:id', authenticateToken,checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.get('/project', authenticateToken,checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjects);
router.get('/project/:id', authenticateToken,checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getProjectById);

router.post('/project/associate', authenticateToken,checkRole([ROLES.ADMIN]), projectController.assignUserToProjects);
router.delete('/project/disassociate', authenticateToken,checkRole([ROLES.ADMIN]), projectController.removeUserFromProjects);

//Manejo de errores
router.use(errorHandler);

//Se exporta la rutas de los modulos para el manejo de proyectos
module.exports = router;