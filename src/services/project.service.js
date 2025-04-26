//Se importan los modelos de los proyectos y usuarios, para hacer la relaciones 
const Projects = require('../models/project.model');
const User = require('../models/user.model');

//El servicio para crear proyectos
exports.createProject = async (data) => {
    try {
        const newProject = await Projects.create(data);
        return newProject;
    }catch (error) {
        throw new Error('Error al crear el proyecto' + error.message);
    }
};

//El servicio para obtener todos lo usuaios de un administrador
exports.getAllProjects = async () => {
    try {
        const projects = await Projects.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User, // Relación de usuarios
                    as: 'usuarios', // Alias para la relación de usuarios
                    attributes: ['id', 'nombre', 'email'], // Los atributos de usuario que deseas mostrar
                    through: { attributes: [] } // Si es una relación muchos a muchos, omitimos la tabla intermedia
                }
            ]
        });
        return projects;
    } catch (error) {
        throw new Error('Error al obtener los proyectos: ' + error.message);
    }
};

//El servicio para obtener todos los proyectos por id
exports.assignUserToProjects = async (data) => {

    console.log('Asignando usuarios a proyectos, project.service.js');
    
    console.log('Id del proyecto: ', data.project_id);
    const project = await Projects.findByPk(data.project_id);
    console.log('Proyecto encontrado: ', project);

    if (!project) throw new Error('Proyecto no encotrado');

    const Users = await User.findAll({ where: {id: data.user_id}});
    if(Users.length !== data.user_id.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(Users);
    return await Projects.findByPk(data.project_id,{
        include:[
            {
            model: User,
            as: 'usuarios',
            attributes: ['id','nombre', 'email'],
            through: {attributes: []}
            }
        ]
    })
}

//El servicio para eliminar un usuario de un proyecto
exports.removeUserFromProjects = async (data) => {
    console.log('Eliminando usuarios de proyectos, project.service.js');
    console.log('Id del proyecto: ', data.project_id);

    const project = await Projects.findByPk(data.project_id);
    console.log('Proyecto encontrado: ', project);

    if (!project) throw new Error('Proyecto no encontrado');

    const user = await User.findByPk(data.user_id);
    if (!user) throw new Error('Usuario no encontrado');

    await project.removeUsuarios(user);

    return { message: 'Usuario eliminado del proyecto con éxito' };
};

//El servicio para actualizar los datos de un proyecto
exports.updateProject = async (id, data) => {
    try {
        const project = await Projects.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.update(data);
        return project;
    } catch (error) {
        throw new Error('Error al actualizar el proyecto: ' + error.message);
    }
};

//El servicio para eliminar un proyecto
exports.deleteProject = async (id) => {
    try {
        const project = await Projects.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' };
    } catch (error) {
        throw new Error('Error al eliminar el proyecto: ' + error.message);
    }
};

//El servicio para obtener un proyecto con id
exports.getProjectById = async (id) => {
    try {
        const project = await Projects.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'], 
                    through: { attributes: [] } 
                }
            ]
        });

        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        return project;
    } catch (error) {
        throw new Error('Error al obtener el proyecto: ' + error.message);
    }
};