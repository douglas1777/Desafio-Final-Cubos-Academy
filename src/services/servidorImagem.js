const { v4: uuid } = require('uuid')
const { createClient } = require('@supabase/supabase-js')

const { env } = process
const endpoint = env.API_BUCKET_ENDPOINT

const supabase = createClient(env.API_BUCKET_URL, env.API_BUCKET_KEY)

exports.uploadImagem = async (bucketNome, path, buffer, tipo) => {
  const { data, error } = await supabase.storage
    .from(bucketNome)
    .upload(path + '/' + uuid(), buffer, {
      contentType: tipo,
    })

  if (error) {
    console.log(error)
    throw new Error()
  }

  return { url: endpoint + data.path }
}

exports.getImagem = async (bucketNome, path) => {
  const { data, error } = await supabase.storage.from(bucketNome).list(path)
  
  if (error) {
    console.log(error)
    throw new Error()
  }

  return data
}

exports.deleteImagem = async (bucketNome, caminhoImagem) => {
  const { data, error } = await supabase.storage
    .from(bucketNome)
    .remove([caminhoImagem])

  if (error) {
    console.log(error)
    return error
  }
}
