require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { erros } = require("./intermediarios/erros");

const rotasUsuarios = require("./rotas/usuarios.js");
const rotasCategorias = require("./rotas/categorias");
const rotasAutenticacao = require("./rotas/autenticacao");

const app = express();

app.use(express.json());

app.use("/usuarios", rotasUsuarios);
app.use("/categorias", rotasCategorias);
app.use("/login", rotasAutenticacao);
app.use(erros);

app.listen(process.env.PORT, () => {
  console.log(`Online on Port ${process.env.PORT}`);
});
