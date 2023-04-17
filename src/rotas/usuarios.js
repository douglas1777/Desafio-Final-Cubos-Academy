const express = require("express");

const { cadastrarUsuario, detalharUsuario } = require("../controladores/usuarios");
const { validarToken } = require("../intermediarios/validaToken");

const router = express.Router();

router.post("/", cadastrarUsuario);
//daqui pra baixo,precisa estar logado
router.use(validarToken);

router.get("/", detalharUsuario)

module.exports = router;
