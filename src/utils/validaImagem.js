const { getImagem, deleteImagem } = require('../services/servidorImagem')

const { env } = process

const verificaUrl = async (url) => {
  const nomeImagem = url.split(env.API_BUCKET_ENDPOINT + 'produtos/')[1]
  const imagem = await getImagem(env.API_BUCKET_NOME, 'produtos')
  return imagem.find((url) => url.name === nomeImagem)
}

const apagaImagem = async (url) => {
  const caminhoImagem = url.split(env.API_BUCKET_ENDPOINT)[1]

  return await deleteImagem(env.API_BUCKET_NOME, caminhoImagem)
}

module.exports = { verificaUrl, apagaImagem }
