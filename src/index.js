require("dotenv").config();
const express = require("express");

const rotasUsuarios = require("./rotas/usuarios.js");
const rotasCategorias = require("./rotas/categorias");
const rotasAutenticacao = require("./rotas/autenticacao");

const app = express();

app.use(express.json());

app.use("/usuarios", rotasUsuarios);
app.use("/categorias", rotasCategorias);
app.use("/login", rotasAutenticacao);

app.listen(process.env.PORT, () => {
  console.log(`Online on Port ${process.env.PORT}`);
});
