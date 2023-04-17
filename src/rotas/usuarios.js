const express = require("express");

const { cadastrarUsuario, detalharUsuario, editarUsuario } = require("../controladores/usuarios");
const { validarToken } = require("../intermediarios/validaToken");
const { validacaoCampos } = require("../intermediarios/validaUsuario");
const router = express.Router();

router.post("/", validacaoCampos, cadastrarUsuario);
//daqui pra baixo,precisa estar logado
router.use(validarToken);

router.get("/", detalharUsuario)
router.post("/", validacaoCampos, editarUsuario)

module.exports = router;
