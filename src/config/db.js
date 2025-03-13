const {Sequielize} = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequielize = new Sequielize (process.env.DB_NAME, process.env.BD_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    loggin: false,
    timezone: '-05:00'
});

module.exports = sequielize;