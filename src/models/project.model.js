//Se importan los archivos
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

//Se declaran los nombre de id, nombre, description, fechaCreacion, administrador_id.
//Se definen sus propiedades
const project = sequelize.define('proyecto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull: false
    },
    fecha_creacion:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    administrador_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {model: User, key:'id'}
    }
},{
    timestamps: false,
    tableName:'proyectos',
    hooks:{
        afterCreate: (project, option) =>{
            if(project.fecha_creacion){
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

//Se exporta el modulo de project models
module.exports = project;