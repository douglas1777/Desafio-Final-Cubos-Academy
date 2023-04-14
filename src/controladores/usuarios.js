const knex = require("../conexão");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const rotasUsuario = {
  async cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const criptografiSenha = await bcrypt.hash(senha, 10);
      const consultaEmail = await knex("usuarios").where(email);
      if (consultaEmail) {
        return res.status(403).json({
          mensagem: `Já existe usuário cadastrado com o
        e-mail informado.`,
        });
      }
      const usuarioCadastrado = await knex("usuarios")
        .insert({ nome, email, criptografiSenha })
        .returning("*");

      const usuarioSemSenha = {
        id: usuarioCadastrado.rows[0].id,
        nome: usuarioCadastrado.rows[0].nome,
        email: usuarioCadastrado.rows[0].email,
      };

      return res.status(201).json(usuarioSemSenha);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  async loginUsuario(req, res) {
    const { email, senha } = req.body;

    try {
      const consultaUSuario = await knex("usuarios").where(email);

      if (!consultaUSuario.rows[0]) {
        return res.status(400).json({ message: "usuario ou senha invalido" });
      }

      const validarLogin = await bcrypt.compare(
        senha,
        consultaUSuario.rows[0].senha
      );

      if (!validarLogin) {
        return res.status(400).json({ message: "usuario ou senha invalido" });
      }

      const token = await jwt.sign(
        { id: consultaUSuario.rows[0].id },
        process.env.SECRETJWT,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        usuario: {
          id: consultaUSuario.rows[0].id,
          nome: consultaUSuario.rows[0].nome,
          email,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};
module.exports = rotasUsuario;
