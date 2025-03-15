const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try{
        const UserExists = await User.findOne({where : {email}})
        if (UserExists){
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create ({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser;
    } catch (erro){
        throw new Error('Error al crear el nuevo usuario: ${err.message}');
    }


};