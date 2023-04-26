const yup = require("yup");
const { pt } = require("yup-locales");
yup.setLocale(pt);
const errosYup = {};
const validate = (schemas) => async (req, res, next) => {
  try {
    const schema = schemas((schema) => schema);

    await schema.validateSync(req.body, { abortEarly: false });
  } catch (error) {
    error.inner.map((erro) => {
      errosYup[erro.path] = erro.message;
    });
    return res.status(400).json({ mensagem: errosYup });
  }
  return next();
};

module.exports = validate;
