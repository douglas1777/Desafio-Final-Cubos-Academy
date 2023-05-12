const multer = require('multer')
const validarImagem =  multer({}).single('imagem')
module.exports = validarImagem