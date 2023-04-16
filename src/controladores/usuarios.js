require("dotenv").config();
const knex = require("../config/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const criptografiSenha = await bcrypt.hash(senha, 10);
    const consultaEmail = await knex("usuarios")
      .where({ email })
      .first()
      .returning("*");

    if (consultaEmail) {
      return res.status(403).json({
        mensagem: `Já existe usuário cadastrado com o e-mail informado.`,
      });
    }
    const usuarioCadastrado = await knex("usuarios")
      .insert({ nome, email, senha: criptografiSenha })
      .returning("*");
    console.log(usuarioCadastrado);

    const usuarioSemSenha = {
      id: usuarioCadastrado[0].id,
      nome: usuarioCadastrado[0].nome,
      email: usuarioCadastrado[0].email,
    };
    return res.status(201).json(usuarioSemSenha);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = cadastrarUsuario;
