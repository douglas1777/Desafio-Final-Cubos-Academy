const { criptografar } = require("../../utils/bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {
  consultaUsuario,
  salvarUsuario,
} = require("../../repositorios/usuarios");
const { erro_usuario_nao_encontrado } = require("../../utils/msgErros");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  const criptografiaSenha = await criptografar(senha);

  const emailExiste = await consultaUsuario(email);

  if (emailExiste) {
    return res.status(StatusCodes.FORBIDDEN).json({
      mensagem: `Já existe usuário cadastrado com o e-mail informado.`,
    });
  }
  const usuarioCadastrado = await salvarUsuario({
    nome,
    email,
    senha: criptografiaSenha,
  });

  const usuarioSemSenha = {
    id: usuarioCadastrado[0].id,
    nome: usuarioCadastrado[0].nome,
    email: usuarioCadastrado[0].email,
  };
  return res.status(201).json(usuarioSemSenha);
};

const detalharUsuario = async (req, res) => {
  const id = req.usuario;

  const usuarioEncontrado = await consultaUsuario(id);

  if (!usuarioEncontrado) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_usuario_nao_encontrado);
  }

  return res.status(200).json(usuarioEncontrado);
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
