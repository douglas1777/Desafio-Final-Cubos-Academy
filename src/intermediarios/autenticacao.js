const { verificaToken } = require("../utils/jwt");

const validarToken = (req, res, next) => {
  const { authorization } = req.headers;
  
  try {
    const token = authorization.split(" ")[1];
    
    const { id } = verificaToken(token, process.env.SECRETJWT);

    req.usuarioId = id;
    next();
  } catch (erro) {
    return res.status(400).json({
      mensagem: erro.message,
    });
  }
};

module.exports = {
  validarToken
};