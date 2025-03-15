const express = require("express");
const cors = require("cors");

const produtoRoutes = require("./routes/produtoRoutes");
const empresaRoutes = require("./routes/empresaRoutes");
const centroDeCustoRoutes = require("./routes/centroDeCustoRoutes");
const departamentoRoutes = require("./routes/departamentoRoutes");
const transferenciaRoutes = require("./routes/transferenciaRoutes");

const app = express();
const port = 3100;

app.use(cors());
app.use(express.json());

// Configurar rotas
app.use("/produtos", produtoRoutes);
app.use("/empresas", empresaRoutes);
app.use("/centro_de_custos", centroDeCustoRoutes);
app.use("/departamentos", departamentoRoutes);
app.use("/transferencias", transferenciaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
