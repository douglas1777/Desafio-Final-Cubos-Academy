const yup = require("yup");
const { pt } = require("yup-locales");
yup.setLocale(pt);
//após criar, me questionei sobre a necessidade de haver esse schema... vamos discutir na próxima daily
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().min(8).required(),
});

module.exports = loginSchema;
