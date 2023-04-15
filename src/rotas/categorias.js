const express = require('express');
const { listarCategorias } = require('../controladores/categorias');

const router = express.Router();

router.get('/', listarCategorias);

module.exports = router;