const { Router } = require("express");

const { erros } = require("../intermediarios/erros");
const rotasUsuarios = require("./usuarios.js");
const rotasCategorias = require("./categorias");
const rotasAutenticacao = require("./autenticacao");

const rotas = Router();

rotas.use("/usuarios", rotasUsuarios);
rotas.use("/categorias", rotasCategorias);
rotas.use("/login", rotasAutenticacao);
rotas.use(erros);

module.exports = { rotas };
