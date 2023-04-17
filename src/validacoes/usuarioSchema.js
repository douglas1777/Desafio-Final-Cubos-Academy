const yup = require("yup");
const { pt } = require("yup-locales");
yup.setLocale(pt);

const cadastroSchema = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().min(8).required(),
});
const atualizacaoCadastroSchema = yup.object().shape({
  nome: yup.string().nullable(),
  email: yup.string().email().nullable(),
  senha: yup.string().min(8).nullable(),
});

module.exports = {
  cadastroSchema,
  atualizacaoCadastroSchema,
};
