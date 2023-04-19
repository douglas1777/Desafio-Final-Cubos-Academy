const bcrypt = require("bcrypt");
const criptografarSenha = async (senha) => {
  return bcrypt.hash(senha.toString(), 10);
};
module.exports = { criptografarSenha };
