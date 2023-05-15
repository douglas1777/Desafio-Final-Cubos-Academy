const { assign } = require('nodemailer/lib/shared')
const { uploadImagem, getImagem } = require('../../services/servidorImagem')
const { StatusCodes } = require('http-status-codes')
const endpoint = process.env.API_BUCKET_ENDPOINT
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
const listar = async (req, res) => {
  const imagens = await getImagem(process.env.API_BUCKET_NOME, 'produtos')
  const listaImagens = []
  for (let images of imagens) {
    if (images.name) {
      listaImagens.push({
        url: endpoint + 'produtos/' + images.name,
        diretorio: 'produtos/' + images.name,
      })
    }
  }
  return res.status(StatusCodes.OK).json(listaImagens)
}

module.exports = { upload, listar }
