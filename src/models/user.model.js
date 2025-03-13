const {DataTypes} = require('sequelize');
const sequelize = require('../config/bd');
const { type } = require('express/lib/response');

const User = sequelize.define('Usuarios',{
    id : {type:DataTypes.INTEGER , primarykey: true, autoIncrement:true},
    nombre : {type:DataTypes.STRING , allownull: false },
    email : {type:DataTypes.STRING , allownull: false , unique:true},
    pasword : {type: DataTypes.STRING, allownull: false},

    rol_id:{
        type: DataTypes.INTEGER,
        allownull: false,
        reference
    }
})