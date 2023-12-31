const express = require("express");
const {
  listarContas,
  criarConta,
  atualizarConta,
  excluirConta,
} = require("./controllers/contas");

const {
  depositar,
  sacar,
  transferir,
  verificarSaldo,
  verificarExtrato,
} = require("./controllers/transacoes");
const { validarSenha } = require("./intermediarios");

const rotas = express();

// operações da conta
rotas.get("/contas", validarSenha, listarContas);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta/usuario", atualizarConta);
rotas.delete("/contas/:numeroConta", excluirConta);

// transações
rotas.post("/transacoes/depositar", depositar);
rotas.post("/transacoes/sacar", sacar);
rotas.post("/transacoes/transferir", transferir);
rotas.get("/contas/saldo", verificarSaldo);
rotas.get("/contas/extrato", verificarExtrato);

module.exports = rotas;
