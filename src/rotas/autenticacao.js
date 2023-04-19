const { Router } = require("express");

const { login } = require("../controladores/usuarios/login");
const { loginSchema } = require("../schemas/schemasUsuario");

const router = Router();

router.post("/", loginSchema, login);

module.exports = router;
