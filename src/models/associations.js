//Se importan los archivos
const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');

//Verifica los usuarios en un proyecto o proyectos que este relacionados a un usuarios
User.belongsToMany(Project, { through: UserProject, foreignKey: 'usuario_id', as: 'Proyectos' });
Project.belongsToMany(User, { through: UserProject, foreignKey: 'proyecto_id', as: 'usuarios' });

//Verifica los usuarios como administrador
Project.belongsTo(User, { foreignKey: 'administrador_id', as: 'administrador' });

//Se exporta las Variables
module.exports = {User, Project, UserProject};