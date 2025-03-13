const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const RolePermission = require('../models/rolPermission.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

exports.loginUser = async (email, password) =>{
    try{
        const user = await User.findOne({ where:{email}});
        if(!user){
            throw new Error('Usuarion no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error ('Contraseña Incorrecta');
        }

        const rolePermissions = await RolePermission.findAll({
            where: {rol_id: user.rol_id},
            atributes : ['permiso_id']
        });

        const permiso = rolePermissions.map(rp => rp.permiso_id);
        const token = jwt.sing(
            {id: user.id , nombre: user.nombre, email: user.email , rol_id: user.rol_id, permiso},
            SECRET_KEY,
            {expireIn: '1h'}
        );
        return token;
    } catch(error){
        throw new Error(error.message || 'Error al iniciar sesion');
    }
};