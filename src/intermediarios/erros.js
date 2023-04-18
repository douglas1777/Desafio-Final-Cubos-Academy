const msgErros = require("../utils/msgErros");

const erros = async (erro, req, res, next) => {
  console.log(erro);
  return res.status(500).json(msgErros.erro_interno);
};

module.exports = { erros };
