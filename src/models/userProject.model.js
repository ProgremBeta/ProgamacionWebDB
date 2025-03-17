//Se importan los modulos
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const { UserProject } = require('./associations');
//const { type } = require('express/lib/response');

//
const User = sequelize.define('Usuarios',{
    id :{
        type:DataTypes.INTEGER,
        primarikey: true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rol_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.export = User;