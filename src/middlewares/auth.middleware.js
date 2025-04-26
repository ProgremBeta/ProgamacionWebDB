//Importa el paquete jsonwebtoken y dotenv para el manejo de variables de entorno y json web token
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Importa el archivo dotenv para el manejo de variables de entorno
dotenv.config();

//Se llama las variables de entorno desde el archivo dotenv
const SECRET_KEY = process.env.JWT_SECRET;

//Se exporta las variables de entorno para el manejo de json web token
const authenticateToken = (req, res,next) =>{
    const token = req.header('Authorization')?.split(' ')[1];
    console.log('Token recibido:', token);

    if(!token){
        console.log('No se proporcionó un token');
        return res.status(401).json({message: 'Acceso denegado, no se ha proporcionado un token'});
    }

    jwt.verify(token,SECRET_KEY,(err, user) =>{
        if(err){
            return res.status(403).json({message: 'Token no valido'});
        }

        req.user = user;
        next();
    })
}

//Se exporta la funcion checkRole para verificar los roles de los usuarios 
const checkRole = (roles) => {
    return (req, res, next) => {
        const { rol_id} = req.user;
    
        console.log('Estoy aqui en auth.middleware.js');
        console.log('Roles permitidos:', roles);

        if(!roles.includes(rol_id)){
            return res.status(403).json({ mesage: 'Acceso denegado, no tienes premiso para realizar esta accion'})
        }

        console.log('Pase de verificacion de roles');

        next();
    };
};

//Se exporta la funcion authenticateToken y checkRole
module.exports = {authenticateToken, checkRole}; 