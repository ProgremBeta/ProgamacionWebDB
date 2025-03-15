//Se importan los archivos
const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./UserProject.model');

//Verifica los usuarios en un proyecto o proyectos con usuarios
User.belongsToMany(Project,{ through: UserProject, foreingkey: 'Usuario_id', as:'Proyectos'});
Project.belongsToMany(User,{ through: UserProject, foreingkey: 'Project_id', as:'Usuarios'});

//Verifica los usuarios como administrador
Project.belongTo(User,{ foreingkey:'administrador_id', as:'administrador'});

//Se exporta las Variables
module.exports = {User, Project, UserProject};