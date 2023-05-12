const { uploadImagem } = require('../../services/servidorImagem')

const upload = async (req, res) => {
  const { buffer, mimetype } = req.file

  const urlImagem = await uploadImagem(
    process.env.API_BUCKET_NOME,
    'produtos',
    buffer,
    mimetype
  )

  return res.json(urlImagem)
}

module.exports = { upload }
