const yup = require("yup");
const { pt } = require("yup-locales");
const validate = require("../intermediarios/validacaoYup");
yup.setLocale(pt);

const validacaoCampos = validate((schemas) => {
  return schemas(
    yup.object({
      nome: yup.string().required(),
      email: yup.string().email().required(),
      senha: yup.string().min(3).required(),
    })
  );
});

const loginSchema = validate((schemas) => {
  return schemas(
    yup.object().shape({
      email: yup.string().email().required(),
      senha: yup.string().min(3).required(),
    })
  );
});

module.exports = { validacaoCampos, loginSchema };
