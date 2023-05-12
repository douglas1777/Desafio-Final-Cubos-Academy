const { createTransport } = require('nodemailer')

exports.transportador = createTransport({
  host: process.env.EMAIL_HOST,
  secure: true,
  port: Number(process.env.EMAIL_PORTA),
  auth: {
    user: process.env.EMAIL_USUARIO,
    pass: process.env.EMAIL_SENHA
  }
})