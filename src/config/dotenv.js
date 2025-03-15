//Se importan los modulos
const dotenv = require('dotenv');

//Se llama las variables de entorno
dotenv.config();

//Se exporta las variables de entorno
module.exports = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
};