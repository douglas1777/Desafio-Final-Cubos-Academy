const bcrypt = require("bcrypt");

const criptografar = async (senha) => {
  return await bcrypt.hash(senha, 10);
};

const compararBcrypt = async (senhaBody, senhaBancoDados) => {
  return await bcrypt.compare(senhaBody, senhaBancoDados);
};

module.exports = {
  criptografar,
  compararBcrypt,
};
