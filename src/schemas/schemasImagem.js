const yup = require('yup')

const validate = require('../intermediarios/validacaoYup')

const imagemSchema = validate((schemas) => {
  return schemas(
    yup.object().shape({
      imagem: yup.string().lowercase().trim().min(3).optional(),
    })
  )
})

module.exports = { imagemSchema }
