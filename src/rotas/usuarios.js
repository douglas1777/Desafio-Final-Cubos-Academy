const express = require("express");

const cadastrarUsuario = require("../controladores/usuarios");
const { validarToken } = require("../intermediarios/validaToken");

const router = express.Router();

router.post("/", cadastrarUsuario);
//daqui pra baixo,precisa estar logado
router.use(validarToken);

module.exports = router;
