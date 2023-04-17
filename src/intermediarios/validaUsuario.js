const yup = require("yup");
const { pt } = require("yup-locales");
const validate = require("./validacaoYup");
yup.setLocale(pt);

const validacaoCampos = validate(() => {
  return schemas(
    yup.object().shape({
      nome: yup.string().required(),
      email: yup.string().email().required(),
      senha: yup.string().min(3).required(),
    })
  );
});

const loginSchema = validate(() => {
  return schemas(
    yup.object().shape({
      email: yup.string().email().required(),
      senha: yup.string().min(3).required(),
    })
  );
});

module.exports = { validacaoCampos, loginSchema };
