const yup = require('yup')

const validate = require('../intermediarios/validacaoYup')

const validacaoCamposPedido = validate((schemas) => {
  return schemas(
    yup.object({
      cliente_id: yup.number().integer().required(),
      observacao: yup.string().strict(true).trim().optional(),
      pedido_produtos: yup.array().of(
        yup.object({
          produto_id: yup.number().integer().required(),
          quantidade_produto: yup.number().integer().moreThan(0).required()
        })
      ).required(),
    })
  )
})

module.exports = { validacaoCamposPedido }
