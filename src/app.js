//Se importan los modulos express y cors.
//se llama o se inicializa express
const express = require('express');
const cors = require('cors');
const app = express();

//Permite el uso de datos json
//Permite el uso de solicitudes HTTP
app.use(express.json());
app.use(cors());

//Importa las rutas de los controladores de la API
const userRouter = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

//Se declaran las rutas del proyecto
app.use('/api/v1', userRouter);
app.use('/api/v1', authRoutes);
app.use('/api/v1', projectRoutes);

//Exporta el archivo o modulo
module.exports = app;
