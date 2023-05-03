const yup = require('yup')

const validate = require('../intermediarios/validacaoYup')

const validacaoCamposProduto = validate((schemas) => {
    return schemas(
        yup.object({
            descricao: yup.string().strict().required(),
            quantidade_estoque: yup.number().integer().required(),
            valor: yup.number().integer().required(),
            categoria_id: yup.number().integer().positive().required(),
        })
    )
})


module.exports = { validacaoCamposProduto }