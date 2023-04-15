const express = require("express");
const validaDados = require("../intermediarios/validaLogin");
const login = require("../controladores/autenticacao");
const router = express.Router();

router.post("/", validaDados, login);

module.exports = router;
