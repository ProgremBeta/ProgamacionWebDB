const Sequalize = require('./config/db');
const app = require('./app');
const dotenv = require('./config/dotenv');
const sequielize = require('./config/db');
require('./models/associations');

dotenv.config();

const PORT = process.env.PORT || 5500;

sequielize.authenticate()
    .then(() => {
        console.log('Conectado con SQL ');
        app.listen(PORT, () => {
            console.log(`El servidor esta correindo en el puerto ${PORT}`)
        })
    })

sequielize.sync({force:false}).then(()=>{
    console.log('Conectada a la base de datos');
}).catch(err => {
    console.log('Error al sicronizar con la base de datos', err)
});