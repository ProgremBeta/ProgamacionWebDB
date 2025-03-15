//Se importan los archivos
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

//Se declaran los nombre de id, nombre, description, fechaCreacion, administrador_id.
//Se definen sus propiedades
const project = sequelize.define('proyecto',{
    id:{
        type:DataTypes.INTEGER,
        primarykey: true,
        autoIncrement: true
    },
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    fechaCreacion:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    administrador_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {model: User, key:'id'}
    }
},
{
    timesstamps: false,
    tableName:'proyectos',
        afterCreate: (Project, option) =>{
            if(project.fechaCreacion){
                project.fechaCreacion.setHours(project.fechaCreacion.getHours()-5);
            }
        }
    }
});

module.exports = project;