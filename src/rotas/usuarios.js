const express = require("express");
const { cadastrarUsuario } = require("../controladores/usuarios");

const router = express.Router();

router.post("/", cadastrarUsuario);

module.exports = router;
