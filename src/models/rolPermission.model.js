//Se importan paquetes y sequelize de bd.js
const {DataTypes, model} = require('sequelize');
const sequelize = require('../config/db');

//Verifica los roles y permisos de los usuarios
const RolePermission = sequelize.define('roles_permisos', {
    rol_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{model:'roles', key:'id'} 
    },
    permiso_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{model:'permisos', key:'id'} 
    }
},{
    timesstamps: false,
    tableName: 'roles_permisos',
});

//Se exporta el modulo de RolePermission
module.exports = RolePermission;