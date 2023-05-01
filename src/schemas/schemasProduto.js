const yup = require('yup')
const { pt } = require('yup-locales')
const validate = require('../intermediarios/validacaoYup')
yup.setLocale(pt)

const validacaoCamposProduto = validate((schemas) => {
    return schemas(
        yup.object({
            descricao: yup.string().strict().required(),
            quantidade_estoque: yup.number().integer().strict().required(),
            valor: yup.number().integer().strict().required(),
            categoria_id: yup.number().integer().positive().strict().required(),
        })
    )
})


module.exports = { validacaoCamposProduto }