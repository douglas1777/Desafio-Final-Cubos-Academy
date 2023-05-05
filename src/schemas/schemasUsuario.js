const yup = require('yup')

const validate = require('../intermediarios/validacaoYup')

const validacaoCampos = validate((schemas) => {
  return schemas(
    yup.object({
      nome: yup.string().strict(true).trim().required(),
      email: yup.string().lowercase().trim().email().required(),
      senha: yup.string().strict(true).lowercase().trim().min(3).required(),
    })
  )
})

const loginSchema = validate((schemas) => {
  return schemas(
    yup.object().shape({
      email: yup.string().lowercase().trim().email().required(),
      senha: yup.string().strict(true).lowercase().trim().min(3).required(),
    })
  )
})

module.exports = { validacaoCampos, loginSchema }
