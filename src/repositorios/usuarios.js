const jwt = require("jsonwebtoken");

const knex = require("../config/conexao");

const consultaUsuario = async (emailOuId) => {
  if (typeof emailOuId === "string") {
    return await knex("usuarios").where({ email: emailOuId }).first();
  }
  return await knex("usuarios").where({ id: emailOuId }).first();
};

const salvarUsuario = async (usuario) => {
  return await knex("usuarios").insert(usuario).returning("*");
};

const atualizarUsuario = async (usuario, id) => {
  return await knex("usuarios").update(usuario).where({ id });
};

module.exports = { consultaUsuario, salvarUsuario, atualizarUsuario };
