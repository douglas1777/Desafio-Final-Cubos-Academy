const { criptografar } = require("../../utils/bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {
  consultaUsuario,
  salvarUsuario,
  atualizarUsuario,
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
  const id = req.usuarioId;

  const usuarioEncontrado = await consultaUsuario(id);

  if (!usuarioEncontrado) {
    return res.status(StatusCodes.NOT_FOUND).json(erro_usuario_nao_encontrado);
  }
  const usuarioSemSenha = {
    id,
    nome: usuarioEncontrado.nome,
    email: usuarioEncontrado.email,
  };

  return res.status(200).json(usuarioSemSenha);
};

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const id = req.usuarioId;

  const criptografiaSenha = await criptografar(senha);

  const emailExiste = await consultaUsuario(email);

  if (email !== emailExiste.email) {
    return res.status(StatusCodes.FORBIDDEN).json({
      mensagem: `Já existe usuário cadastrado com o e-mail informado.`,
    });
  }
  const usuarioCadastrado = await atualizarUsuario(
    {
      nome,
      email,
      senha: criptografiaSenha,
    },
    id
  );

  const usuarioSemSenha = {
    id: usuarioCadastrado[0].id,
    nome: usuarioCadastrado[0].nome,
    email: usuarioCadastrado[0].email,
  };
  return res.status(201).json(usuarioSemSenha);
};

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  editarUsuario,
};
