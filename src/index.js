require("dotenv").config();
require("express-async-errors");
const express = require("express");

const { rotas } = require("./rotas");

const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use(rotas);

app.listen(PORT, () => {
  console.log(`Online em http://localhost:${PORT}`);
});
