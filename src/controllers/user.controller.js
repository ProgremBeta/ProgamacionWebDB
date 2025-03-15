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

//Exporta la funcion de actualizar usuario
exports.updateUser = async(req,res) => {
    const{id} = req.params;
};