const { compararBcrypt } = require("../../utils/bcrypt");
const { consultaUsuario } = require("../../repositorios/usuarios");
const { erro_login } = require("../../utils/msgErros");
const { criaToken } = require("../../utils/jwt");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { senha } = req.body;

  const verificaUsuario = await consultaUsuario(req.body.email);

  if (!verificaUsuario) {
    return res.status(StatusCodes.UNAUTHORIZED).json(erro_login);
  }

  const { id, nome, email } = verificaUsuario;

  const validarLogin = await compararBcrypt(senha, verificaUsuario.senha);

  if (!validarLogin) {
    return res.status(StatusCodes.UNAUTHORIZED).json(erro_login);
  }
  const token = criaToken(verificaUsuario.id);

  return res.json({
    usuario: { id, nome, email },
    token,
  });
};
module.exports = { login };
