//Se importan los modulos
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
//const { type } = require('express/lib/response');

//Se declaran los nombre de id, nombre, email, password y rol_id, para la tabla usuariosProyecto.
const UserProject = sequelize.define('UsuariosProyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id' // Nombre exacto de la columna en la base de datos
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'usuario_id' // Nombre exacto de la columna en la base de datos
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'proyecto_id' // Nombre exacto de la columna en la base de datos
    }
}, {
    timestamps: false,
    tableName: 'usuarios_proyectos' // Nombre exacto de la tabla en la base de datos
});

//Se exporta el modulo de UserProject
module.exports = UserProject;