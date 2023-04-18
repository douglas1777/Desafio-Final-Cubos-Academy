const bcrypt = require("bcrypt");

const criptografar = async (senha) => {
  return await bcrypt.hash(senha.toString(), 10);
};

const compararBcrypt = async (senhaBody, senhaBancoDados) => {
  return await bcrypt.compare(senhaBody.toString(), senhaBancoDados);
};

module.exports = {
  criptografar,
  compararBcrypt,
};
