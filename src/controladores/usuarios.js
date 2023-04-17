require("dotenv").config();
const knex = require("../config/conexao");
const { StatusCodes } = require("http-status-codes");
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

const detalharUsuario = (req, res) => {
  let { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const { iat, exp, ...usuario } = jwt.verify(token, process.env.SECRETJWT);

    return res.status(200).json(usuario);
  } catch (erro) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado",
    });
  }
};

const editarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  const usuarioExiste = await knex("usuarios").where({ id: req.usuario.id });

  if (usuarioExiste && usuarioExiste.email !== email) {
    return res.status(StatusCodes.NOT_FOUND).json({
      mensagem: "O e-mail informado já está sendo utilizado por outro usuário.",
    });
  }

  const senhaEncriptada = await bcrypt.hash(senha, 10);
  await knex("usuarios").update({
    ...req.body,
    senha: senhaEncriptada,
  });
  
  return res.status(StatusCodes.NO_CONTENT).send();
};

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  editarUsuario,
};
