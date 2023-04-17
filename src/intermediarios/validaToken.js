require("dotenv").config();
const jwt = require("jsonwebtoken");

const validarToken = (req, res, next) => {
  let { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const usuario = jwt.verify(token, process.env.SECRETJWT);
    req.usuario = usuario;

    next();
  } catch (erro) {
    return res.status(400).json({
      mensagem: "Token expirado",
    });
  }
};

module.exports = {
  validarToken
};
