const verificaDadosRepetidos = (body, dados) => {
  let dado = []

  if (dados.cpf === body.cpf) dado.push('cpf')
  if (dados.email === body.email) dado.push('email')

  return dado.join(' e ')
}

module.exports = { verificaDadosRepetidos }
