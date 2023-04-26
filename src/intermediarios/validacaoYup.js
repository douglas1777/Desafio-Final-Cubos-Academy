const yup = require('yup')
const { pt } = require('yup-locales')
yup.setLocale(pt)

const errosYup = {}

const validate = (schemas) => (req, res, next) => {
  const schema = schemas((schema) => schema)
  try {
    schema.validateSync(req.body, { abortEarly: false })
  } catch (error) {
    console.log(error)
    error.inner.map((erro) => {
      errosYup[erro.path] = erro.message
    })
    return res.status(400).json({ mensagem: errosYup })
  }
  next()
}

module.exports = validate
