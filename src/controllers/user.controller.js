//Se importa los archivos user.service
const userService = require ('../services/user.service');

//Exporta la funcion de crear usuario y muestra mensaje de exito o error
exports.createUser = async (req, res) =>{
    try{
        const { nombre, email, password, rol_id, administrador_id} = req.body;
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({message: 'Usuario creado con exito', user: newUser});
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

//Realiza una consulta para ver los administradores
exports.getAllUsersByAdministradorId = async (req,res) => {
    try{
        const admin_from_token = req.user.id;
        const { email } = req.query;
        const users = await userService.getAllUserByAdministradorId(admin_from_token ,email);
        res.status(200).json({ message: 'Usuarios consultados con exito', users});
    }catch(error){
        res.status(500).json({ message: 'Error al obtener los usuarios', error});
    }
};

//Realiza una consulta para ver todos lo usuarios por el rol
exports.getAllUsersByRolId = async (req, res) => {
    try{
        const users = await userService.getAllUsersByRolId(req.params.id);
        res.status(200).json({message: 'Usuarios consultados con exito', users})
    }catch (error){
        res.status(500).json({message: 'Error al obtener los usuarios', error});
    }
};

//Exporta la funcion de actualizar usuario
exports.updateUser = async(req,res) => {
    const{id} = req.params;
    const {nombre, email, rol_id, administrador_id} = req.body;
    const admin_from_token = req.user.id;
    try{
        const user = await userService.updateUser(id, nombre, email,rol_id, administrador_id, admin_from_token);
        res.status(200).json({message : 'Usuario actualizado con exito', user})
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

//Exporta la funcion para eliminar un usuario
exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    const admin_from_token = req.user.id;
    try{
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json(result);
    }catch (err){
        res.status(500).json ({ message: err.message});
    }
};