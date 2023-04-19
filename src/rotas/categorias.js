const express = require("express");
const { listarCategorias } = require("../controladores/transacoes/categorias");

const router = express.Router();

router.get("/", listarCategorias);

module.exports = router;
