const { Router } = require("express");

const { login } = require("../controladores/usuarios/login");
const { loginSchema } = require("../schemas/schemasUsuario");

const rotas = Router();

rotas.post("/", loginSchema, login);

module.exports = rotas;
