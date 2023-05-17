const { StatusCodes } = require('http-status-codes')
const multer = require('multer')

const msg = require('../utils/msgErros')

const validarRequisicaoImagem = (req, res, next) => {
  if (!req.file){
    return res.status(StatusCodes.BAD_REQUEST).json(msg.erro_imagem_obrigatoria)
  }
  if (!req.file.mimetype.startsWith('image/')) {
    return res.status(StatusCodes.BAD_REQUEST).json(msg.erro_imagem_tipo)
  }
  next()
}

const validarImagem = multer({}).single('imagem')

module.exports = { validarRequisicaoImagem, validarImagem }
