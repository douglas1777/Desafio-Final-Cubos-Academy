const { Router } = require("express");

const login = require("../controladores/autenticacao");
const { loginSchema } = require("../intermediarios/validaUsuario");

const router = Router();

router.post("/", loginSchema, login);

module.exports = router;
