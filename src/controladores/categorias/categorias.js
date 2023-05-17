const { repos } = require("../../repositorios")

const listarCategorias = async (req, res) => {
  const categorias = await repos.consultaCategorias('categorias')
  return res.status(200).json(categorias)
}
module.exports = { listarCategorias }
