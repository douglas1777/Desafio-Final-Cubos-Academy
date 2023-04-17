const yup = require("yup");
const { pt } = require("yup-locales");
yup.setLocale(pt);

const validate = (schemas) => async (req, res, next) => {
   try {
      const schema = schemas((schema) => schema);

      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      const [resultado] = error.details.map(({ message }) => {
        return message;
      });
      return res.status(400).json({ mensagem: resultado });
    }
}

module.exports = validate;