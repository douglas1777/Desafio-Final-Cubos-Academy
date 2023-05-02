const { id } = require('yup-locales');
const knex = require('../config/conexao');

const salvarProduto = async (produto) => {
    return await knex('produtos').insert(produto).returning('*')
}

const veriricarCategoriaExiste = async (id) => {
    return await knex('categorias').where({ id })
}

const verificarProdutoExiste = async (id) => {
    return await knex('produtos').where({ id })
}

const detalharprodutos = async (categoria_id) => {

    if (categoria_id) {
        return await knex('produtos').where({ categoria_id });
    }

    return await knex('produtos');
};

const atualizarProduto = async (produto, id) => {
    return await knex('produtos').update(produto).where(id).returning('*')
}

const deletarProduto = async (id) => {
    return await knex('produtos').where({ id }).del()
}


module.exports = {
    salvarProduto,
    veriricarCategoriaExiste,
    atualizarProduto,
    detalharprodutos,
    verificarProdutoExiste,
    deletarProduto
}