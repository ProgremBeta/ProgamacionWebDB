//Se declaran y se importan jsonwebtoken, bcrypt, dontev.
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const RolePermission = require('../models/rolPermission.model');

//llama la configuracion de el entorno virtual
dotenv.config();

//Se usa la llave del entorno virtual
const SECRET_KEY = process.env.JWT_SECRET;

//Se exporta la funcion loginUser que confirma que exista el usuario y tenga correcta la contraseña
//ademas del permiso y un mensaje en caso de que falle el proceso
exports.loginUser = async (email, password) =>{
    try{
        const user = await User.findOne({ where:{email}});
        if(!user){
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error ('Contraseña Incorrecta');
        }

        const rolePermissions = await RolePermission.findAll({
            where: {rol_id: user.rol_id},
            attributes : ['permiso_id']
        });

        const permiso = rolePermissions.map(rp => rp.permiso_id);
        const token = jwt.sign(
            {id: user.id , nombre: user.nombre, email: user.email , rol_id: user.rol_id, permiso},
            SECRET_KEY,
            {expiresIn: '1h'}
        );
        return {token, user};
    } catch(error){
        throw new Error(error.message || 'Error al iniciar sesion');
    }
};