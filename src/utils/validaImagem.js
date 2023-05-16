const { getImagem, deleteImagem } = require('../services/servidorImagem')

const { env } = process

const verificaUrl = async (url, path) => {

  if (path === 'produtos' || path === 'teste') {
    const nomeImagem = url.split(`${env.API_BUCKET_ENDPOINT}${path}/`)[1]

    const imagem = await getImagem(env.API_BUCKET_NOME, path)
    
    return imagem.find((url) => url.name === nomeImagem)
  }
  return false
}

const apagaImagem = async (url) => {
  const caminhoImagem = url.split(env.API_BUCKET_ENDPOINT)[1]

  return await deleteImagem(env.API_BUCKET_NOME, caminhoImagem)
}

module.exports = { verificaUrl, apagaImagem }
