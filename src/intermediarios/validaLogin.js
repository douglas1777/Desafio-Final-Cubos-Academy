require("dotenv").config();
const knex = require("../config/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validaDados = async (req, res, next) => {
  const { email, senha } = req.body;
  try {
    const verificaUsuario = await knex("usuarios").where({ email }).first();
    console.log(verificaUsuario);
    if (!verificaUsuario) {
      return res.status(401).json({
        mensagem: "Usuario não encontrado, verifique e tente novamente.",
      });
    }
    const validarLogin = await bcrypt.compare(senha, verificaUsuario.senha);

    if (!validarLogin) {
      return res.status(400).json({ message: "usuario ou senha invalido" });
    }
    const token = await jwt.sign(
      { id: verificaUsuario.id },
      process.env.SECRETJWT,
      { expiresIn: "24h" }
    );
    req.usuario = verificaUsuario;
    console.log(req.usuario);
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = validaDados;
