const { StatusCodes } = require('http-status-codes')
const {
    veriricarCategoriaExiste,
    salvarProduto,
    atualizarProduto,
    detalharprodutos,
    verificarProdutoExiste,
    deletarProduto
} = require('../../repositorios/produtos');
const {
    erro_categoria_nao_encontrada,
    erro_produto_nao_encontrado
} = require('../../utils/msgErros');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    const categoria = await veriricarCategoriaExiste(categoria_id);

    if (!categoria[0]) {
        return res.status(StatusCodes.NOT_FOUND).json(erro_categoria_nao_encontrada)
    }

    const produto = await salvarProduto({ descricao, quantidade_estoque, valor, categoria_id })

    res.status(StatusCodes.CREATED).json(produto)
};


const listarProduto = async (req, res) => {
    const { id } = req.query

    if (id) {
        const categoria = await veriricarCategoriaExiste(id)

        if (!categoria[0]) {
            return res.status(StatusCodes.NOT_FOUND).json(erro_categoria_nao_encontrada)
        }
    }

    const produtos = await detalharprodutos(id)

    if (!produtos) {
        return res.status(StatusCodes.NOT_FOUND).json('Produto não encontrado')
    }

    res.status(StatusCodes.OK).json(produtos)
};


const editarProduto = async (req, res) => {
    const { id } = req.params
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    const produto = await verificarProdutoExiste(id);

    if (!produto[0]) {
        return res.status(StatusCodes.NOT_FOUND).json(erro_produto_nao_encontrado)
    }

    const categoria = await veriricarCategoriaExiste(categoria_id);

    if (!categoria[0]) {
        return res.status(StatusCodes.NOT_FOUND).json(erro_categoria_nao_encontrada)
    }

    await atualizarProduto({ descricao, quantidade_estoque, valor, categoria_id }, { id })

    res.status(StatusCodes.NO_CONTENT).send()
};

const detalharProduto = async (req, res) => {
    const { id } = req.params

    const produto = await verificarProdutoExiste(id);

    if (!produto[0]) {
        return res.status(StatusCodes.NOT_FOUND).json(erro_produto_nao_encontrado)
    }

    res.status(StatusCodes.OK).json(produto)
}

const excluirProduto = async (req, res) => {
    const { id } = req.params

    const produto = await verificarProdutoExiste(id);

    if (!produto[0]) {
        return res.status(StatusCodes.NOT_FOUND).json(erro_produto_nao_encontrado)
    }

    await deletarProduto(id)

    res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = {
    cadastrarProduto,
    editarProduto,
    detalharProduto,
    listarProduto,
    excluirProduto
}