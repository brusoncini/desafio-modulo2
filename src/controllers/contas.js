let { saldo, contas } = require("../bancodedados");
const {
  informacoesObrigatorias,
  contaExistente,
  procurarConta,
} = require("./funcoes");

const listarContas = (req, res) => {
  res.json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  // verificações
  const validacaoInformacoes = informacoesObrigatorias(req);
  if (validacaoInformacoes) {
    return res.status(400).json(validacaoInformacoes);
  }

  const validacaoConta = contaExistente(req);
  if (validacaoConta) {
    return res.status(400).json(validacaoConta);
  }

  // cria uma nova conta
  const novaConta = {
    numero: contas.length + 1,
    saldo: 0,
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha,
  };

  contas.push(novaConta);

  return res.status(201).send();
};

const atualizarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  // verificações
  const contaEncontrada = procurarConta(req);
  if (!contaEncontrada) {
    return res.status(404).json(contaEncontrada);
  }

  const validacaoInformacoes = informacoesObrigatorias(req);
  if (validacaoInformacoes) {
    return res.status(400).json(validacaoInformacoes);
  }

  const validacaoConta = contaExistente(req);
  if (validacaoConta) {
    return res.status(400).json(validacaoConta);
  }

  // atualiza os dados
  contaEncontrada.nome = nome;
  contaEncontrada.cpf = cpf;
  contaEncontrada.data_nascimento = data_nascimento;
  contaEncontrada.telefone = telefone;
  contaEncontrada.email = email;
  contaEncontrada.senha = senha;

  return res.status(204).send();
};

const excluirConta = (req, res) => {
  const { numeroConta } = req.query;

  // verifica se a conta informada existe
  let contaEncontrada = procurarConta(req);
  if (!contaEncontrada) {
    return res.status(404).json(contaEncontrada);
  }

  // verifica se o saldo é 0
  if (saldo !== 0) {
    return res
      .status(400)
      .json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  // retira a conta do array
  contas.splice(
    contas.findIndex((conta) => conta.numero_conta === Number(numeroConta)),
    1
  );

  return res.status(204).send();
};

module.exports = {
  listarContas,
  criarConta,
  atualizarConta,
  excluirConta,
};
