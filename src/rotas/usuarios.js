const express = require("express");

const { cadastrarUsuario, login } = require("../controladores/usuarios");

const router = express.Router();

router.post("/", cadastrarUsuario);
router.post("/", login);

module.exports = router;
