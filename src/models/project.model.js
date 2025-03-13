const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const { type } = require('./user.model');
const { Project } = require('./authenticate');

const Project = sequelize.define('proyecto',{
    id: {type:DataTypes.INTEGER, prymarykey: true, autoIncrement: true},
    nombre: {type:DataTypes.STRING, prymarykey: true},
    descripcion: {type:DataTypes.STRING, prymarykey: true},
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    administrador_id: {
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {model: User, key:'18'}
    },
    {
        timestamps: false,
        tableName:'proyectos',
            afteCreate: (Project, option) =>{
                if(project.fechaCreacion){
                    project.fechaCreacion.setHours(project.fechaCreacion.getHours()-5);
                }
            }
    }
});