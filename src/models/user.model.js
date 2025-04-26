// Se importan los paquetes sequelize y en entorno virtual
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


// Definir los datos de la tabla usuarios
// Se declaran los nombre de id, nombre, email, password, rol_id y administrador_id.
const Users = sequelize.define('usuarios', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false 
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'usuarios', key: 'id' }
    }
}, {
    timestamps: false,
    tableName: 'usuarios'
});

//Se exporta el modulo de users models
module.exports = Users;