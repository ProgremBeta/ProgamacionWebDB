const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

const RolePermission = sequelize.define('roles_permisos', {
    rol_id :{ type: DataTypes.INTEGER, allowNull:false, reference: {model:'roles', key:'id'} },
    permiso_id: { type: DataTypes.INTEGER, allowNull:false, reference: {model:'permisos', key:'id'} }
}, {
    timesstamps: false,
    tableName: 'roles_permisos',
});

module.export = RolePermission;