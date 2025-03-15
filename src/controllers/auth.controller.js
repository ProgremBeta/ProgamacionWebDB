//importa el archivo auth.service
const authService = require('../services/auth.service');

//Se exporta la funcion de login y se toman los datos de email y password
exports.login = async (req , res) => {
    const {email, password} = req.body;

//Mensaje de exito o error
    try{
        const token = await authService.loginUser(email, password);
        res.status(200).json({message: 'Inicio de sesion exitoso', token});
    }catch (err){
        res.status(400).json({message: err.message});
    }
};