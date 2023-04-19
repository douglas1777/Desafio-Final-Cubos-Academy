const express = require("express");

// const {
//   cadastrarUsuario,
//   detalharUsuario,
//   editarUsuario,
// } = require("../controladores/usuarios/usuarios");
const { validarToken } = require("../intermediarios/autenticacao");
const { validacaoCampos } = require("../schemas/schemasUsuario");
const { usuariosControlador } = require("../controladores");

const router = express.Router();

router.post("/", validacaoCampos, usuariosControlador.cadastrarUsuario);
//daqui pra baixo,precisa estar logado
router.use(validarToken);

router.get("/", usuariosControlador.detalharUsuario);
router.put("/", validacaoCampos, usuariosControlador.editarUsuario);

module.exports = router;
