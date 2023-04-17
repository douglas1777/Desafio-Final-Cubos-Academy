const {
  cadastroSchema,
  atualizacaoCadastroSchema,
} = require("../validacoes/usuarioSchema");
const validarCadastro = async (req, res, next) => {
  try {
    await cadastroSchema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.errors });
  }
};
const validaAtualizacaoCadastro = async (req, res, next) => {
  try {
    await atualizacaoCadastroSchema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.errors });
  }
};
module.exports = { validarCadastro, validaAtualizacaoCadastro };
