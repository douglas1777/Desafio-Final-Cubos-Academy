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

module.exports = { consultaUsuario, salvarUsuario };
