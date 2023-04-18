const { sign, verify } = require("jsonwebtoken");

const criaToken = (id) => {
  return sign({ id }, process.env.SECRETJWT, { expiresIn: "1h" });
};

const verificaToken = (token) => {
  return verify(token, process.env.SECRETJWT);
}

module.exports = { criaToken, verificaToken };
