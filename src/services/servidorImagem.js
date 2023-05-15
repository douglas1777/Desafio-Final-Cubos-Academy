const { v4: uuid } = require('uuid')
const { createClient } = require('@supabase/supabase-js')
const endpoint = process.env.API_BUCKET_ENDPOINT

const supabase = createClient(
  process.env.API_BUCKET_URL,
  process.env.API_BUCKET_KEY
)

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
