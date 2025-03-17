//Importa modulos y archivo de la tabla de la base de datos
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

//Crea el usuario
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try{
        const UserExists = await User.findOne({where : {email}})
        if (UserExists){
            throw new Error('El usuario ya existe');
        }

        //Encrypta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create ({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        //Mensaje de error
        return newUser;
    } catch (err){
        throw new Error(`Error al crear el nuevo usuario: ${err.message}`);
    }
};

//Llama a todos los usuarios administradores por id o por email
exports.getAllUserByAdministradorId = async (administrador_id, email) => {
    try{
        const whereClause = { administrador_id };
        if(email){
            whereClause.email = email;
        }
        const user = await User.findAll({ where: whereClause, attributes: { exclude: ['password']}});
        return user;
    }catch (err){
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }

}

//Llama a todos los usuarios con el rol_id
exports.getAllUserByRolId = async (req, res) => {
    try{
        const users = await User.findAll({where:{rol_id},attributes:{exclude:['password']}});
        return users;
    }catch(err){
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

//Exporta la funcion de actualizar usuario y verifica que los usuarios existan,
//que el correo no este repetido, y muestra el mensajes de error o exito
exports.updateUser = async(id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try{
    const user = await User.findByPk(id);
        if (user.administrador_id != admin_from_token){
            throw new Error('Acceso denegado, este usuario no esta bajo su administracion');
        }

        if (!user){
            throw new Error ('Usuario no encontrado');
        }

        if (email && email !== user.email){
            const userExists = await User.findOne({where:{email}});
            if ( userExists){
                throw new Error('El email ya esta en uso');
            }
        }

        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id,
        });

        return user;
    } catch(err){
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

//Esto elimina un usuario pero verifica si el admin o si existe el usuario o si hubo algun problema
//eliminandolo
exports.deleteUser = async(req, res) =>{
    try{
        const user = await User.findByPk(id);
        if(user.administrador_id !== admin_from_token){
            throw new Error('Acceso denegado, este usuario no esta bajo su administracion');
        }

        if(!user){
            throw new Error('Usuario no encontrado');
        }

        await user.destroy();
        return { message: 'Usuario eliminado con exito'};
    }catch (err){
        throw new Error(`Error al eliminiar el usuario: ${err.message}`);
    }
};