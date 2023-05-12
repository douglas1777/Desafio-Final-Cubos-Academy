const express = require("express");
const { listarCategorias } = require("../controladores/transacoes/categorias");

const rotas = express.Router();

rotas.get("/", listarCategorias);

module.exports = rotas;
