const knex = require("../conexão");

const listarCategorias = async (req, res) => {
  const categorias = await knex("categorias");
  return res.status(200).json(categorias);
};
module.exports = listarCategorias;
