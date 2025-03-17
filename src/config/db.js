//Se importan los paquetes sequelize y en entorno virtual
const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');

//Se llama las variables de entorno
dotenv.config();

//Se crea la conexion de la bse de datos con sequelize
const sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    timezone: '-05:00'
});

//Se exporta el modulo
module.exports = sequelize;