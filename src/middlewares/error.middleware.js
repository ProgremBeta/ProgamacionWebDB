const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // hace un  registro de error en la consola

    // Manda error si el error es de tipo "ValidationError"
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token inválido", error: err.message });
    }

    // Manda error si el error es de tipo "TokenExpiredError"
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado, inicia sesión nuevamente", error: err.message });
    }

    // Manda error si el error es de tipo "SequelizeValidationError"
    if (err.name === "SequelizeValidationError") {
        return res.status(400).json({ message: "Error de validación", errors: err.errors.map(e => e.message) });
    }

    // Manda error si el error es de tipo "SequelizeUniqueConstraintError"
    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: "Error de unicidad", error: err.message });
    }

    // Comprueba si el error es de igual al Acceso denegado
    if (err.message === "Acceso denegado, no se proporcionó un token") {
        return res.status(401).json({ message: err.message });
    }

    // Error por permisos insuficientes
    if (err.message === "Acceso denegado, no tienes permiso para realizar esta acción") {
        return res.status(403).json({ message: err.message });
    }

    // Otros errores internos del servidor
    res.status(500).json({ message: "Algo ha salido mal", error: err.message });
};

// Exporta el manejo de errores
module.exports = errorHandler;
