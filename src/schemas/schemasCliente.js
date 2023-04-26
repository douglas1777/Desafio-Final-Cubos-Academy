const yup = require('yup')
const { pt } = require('yup-locales')
const validate = require('../intermediarios/validacaoYup')
const { schemas } = require('.')
yup.setLocale(pt)

const validacaoCamposCliente = validate((schemas) => {
  return schemas(
    yup.object({
      nome: yup.string().trim().required(),
      email: yup.string().email().lowercase().trim().required(),
      cpf: yup.string().required(),
      cep: yup.string().min(8),
      rua: yup.string(),
      numero: yup.number().positive(),
      bairro: yup.string(),
      cidade: yup.string(),
      estado: yup.string(),
    })
  )
})

module.exports = { validacaoCamposCliente }
