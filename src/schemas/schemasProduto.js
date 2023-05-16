const yup = require('yup')

const validate = require('../intermediarios/validacaoYup')

const validacaoCamposProduto = validate((schemas) => {
    return schemas(
        yup.object({
            descricao: yup.string().strict(true).required(),
            quantidade_estoque: yup.number().integer().positive().required(),
            valor: yup.number().integer().positive().required(),
            categoria_id: yup.number().integer().positive().required(),
            produto_imagem: yup.string().strict(true).optional()
        })
    )
})


module.exports = { validacaoCamposProduto }