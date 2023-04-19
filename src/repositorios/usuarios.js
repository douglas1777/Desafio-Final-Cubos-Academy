const jwt = require("jsonwebtoken");
const knex = require("../config/conexao");

const consultaUsuario = async (email) => {
  return await knex("usuarios").where({ email }).first();
};
const cadastrarUsuario = async (usuario) => {
  return await knex("usuarios").insert(usuario).returning("*");
};
module.exports = {
  consultaUsuario,
  cadastrarUsuario,
};
