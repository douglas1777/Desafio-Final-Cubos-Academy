const knex = require("../conexão");

const listarCategorias = async (req, res) => {
  try {
    const categorias = await knex("categorias");
    return res.status(200).json(categorias);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ menssagem: error });
  }
};
module.exports = { listarCategorias };
