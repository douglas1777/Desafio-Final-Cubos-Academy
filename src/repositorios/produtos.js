const knex = require('../database/config')

const salvarProduto = async (produto) => {
  const [inserirProduto] = await knex('produtos').insert(produto).returning('*')
  return inserirProduto
}

const verificarCategoriaExiste = async (id) => {
  return await knex('categorias').where({ id }).first()
}

const filtrarCategoriasExistem = async (id) => {
  return await knex('categorias').whereIn('id', id).first()
}

const verificarProdutoExiste = async (id) => {
  return await knex('produtos').where({ id }).first()
}

const detalharProdutos = async (categoria_id) => {
  if (categoria_id) {
    return await knex('produtos').whereIn('categoria_id', categoria_id).andWhere('quantidade_estoque', '>', 0)
  }

  return await knex('produtos').andWhere('quantidade_estoque', '>', 0)
}

const atualizarProduto = async (produto, id) => {
  return await knex('produtos').update(produto).where({ id })
}

const deletarProduto = async (id) => {
  return await knex('produtos').where({ id }).del()
}

module.exports = {
  salvarProduto,
  verificarCategoriaExiste,
  atualizarProduto,
  detalharProdutos,
  verificarProdutoExiste,
  deletarProduto,
  filtrarCategoriasExistem,
}
