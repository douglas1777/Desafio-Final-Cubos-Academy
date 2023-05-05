const yup = require('yup')

const validate = require('../intermediarios/validacaoYup')

const validacaoCamposCliente = validate((schemas) => {
  return schemas(
    yup.object({
      nome: yup.string().strict(true).trim().required(),
      email: yup.string().email().lowercase().trim().required(),
      cpf: yup.number().positive().integer().min(11).required(),
      cep: yup.number().positive().integer().min(8),
      rua: yup.string().strict(true),
      numero: yup.number().positive().integer(),
      bairro: yup.string().strict(true),
      cidade: yup.string().strict(true),
      estado: yup.string().strict(true),
    })
  )
})

module.exports = { validacaoCamposCliente }
