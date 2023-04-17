const jwt = require("jsonwebtoken");


const login = (req, res) => {
  try {
    let { id, nome, email } = req.usuario;
    const token = jwt.sign(
      {
        id,
        nome,
        email,
      },
      process.env.SECRETJWT,
      {
        expiresIn: "2h",
      }
    );
    return res.status(200).json({
      usuario: { id, nome, email },
      token,
    });
  } catch (erro) {
    return res.status(400).json({
      mensagem: erro.message
    });
  }
};
module.exports = login;
