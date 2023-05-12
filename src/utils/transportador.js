const { transportador } = require('../services/servidorSMTP')

exports.transportarEmail = async (cliente) => {
  const { nome, email } = cliente
  let mensagem
  
  try {
    await transportador.sendMail({
      from: `Grupo_Kakashi <${process.env.EMAIL_USUARIO}>`,
      subject: 'Cadastro',
      to: `${nome} <${email}>`,
      text: 'Seu cadastro foi realizado com sucesso',
    })
    mensagem = `Email enviado com sucesso para ${nome}`
  } catch (error) {
    mensagem = error.message
  }
  return mensagem
}
