const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./UserProject.model');

User.belongToMany(Project,{ through: UserProject, foreingkey: 'Usuario_id', as:'Proyectos'});
Project.belongToMany(User,{ through: UserProject, foreingkey: 'Project_id', as:'Usuarios'});

Project.belongTo(User,{ foreingkey:'administrador_id', as:'administrador'});

module.exports = {User, Project, UserProject};