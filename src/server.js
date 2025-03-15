//Se importan los modulos
const app = require('./app');
const dotenv = require('./config/dotenv');
const sequelize = require('./config/db');
require('./models/associations');

//se llaman las variables de entorno
dotenv.config();

//Define el puerto del ejecucion
const PORT = process.env.PORT || 5500;

//Verifica si la base de datos esta en ejecucion
sequelize.authenticate()
    .then(() => {
        console.log('Conectado con SQL ');
        app.listen(PORT, () => {
            console.log(`El servidor esta correindo en el puerto ${PORT}`)
        })
    })

//Verifica si la sicronizacion con la base de datos es correcta o si tiene errores
sequelize.sync({force:false}).then(()=>{
    console.log('Conectada a la base de datos');
}).catch(err => {
    console.log('Error al sicronizar con la base de datos', err)
});