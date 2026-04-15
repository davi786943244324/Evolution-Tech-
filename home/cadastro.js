// -----------------------------
// Seleção dos elementos
// -----------------------------
const cpfInput = document.getElementById("cpf");
const cepInput = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");

// -----------------------------
// Função para validar CPF
// -----------------------------
function verificarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  let digito1 = resto === 10 || resto === 11 ? 0 : resto;
  if (digito1 !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  let digito2 = resto === 10 || resto === 11 ? 0 : resto;
  if (digito2 !== parseInt(cpf.charAt(10))) return false;

  return true;
}

// -----------------------------
// Evento de validação do CPF
// -----------------------------
if (cpfInput) {
  cpfInput.addEventListener("blur", function () {
    const cpf = this.value;
    if (!verificarCPF(cpf)) {
      alert("CPF inválido! Verifique e tente novamente.");
      this.style.borderColor = "red";
    } else {
      this.style.borderColor = "green";
    }
  });
}

// -----------------------------
// Função para aplicar máscara no CEP
// -----------------------------
function mascaraCEP(input) {
  let numeros = input.value.replace(/\D/g, "");
  if (numeros.length > 8) numeros = numeros.substring(0, 8);

  if (numeros.length > 5) {
    input.value = numeros.substring(0, 5) + "-" + numeros.substring(5);
  } else {
    input.value = numeros;
  }
}

// -----------------------------
// Função para buscar endereço via ViaCEP
// -----------------------------
async function buscarCEP() {
  let cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    alert("CEP inválido! Digite os 8 números corretamente.");
    limparCamposEndereco();
    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!resposta.ok) throw new Error("Erro de rede");
    const dados = await resposta.json();

    if (dados.erro) {
      alert("CEP não encontrado!");
      limparCamposEndereco();
      return;
    }

    // -----------------------------
    // Preenche os campos
    // -----------------------------
    endereco.value = dados.logradouro || "";
    bairro.value = dados.bairro || "";
    cidade.value = dados.localidade || "";
    estado.value = dados.uf || "";
  } catch (erro) {
    alert("Erro ao buscar o CEP. Tente novamente.");
    console.error(erro);
    limparCamposEndereco();
  }
}

// -----------------------------
// Função para limpar campos de endereço
// -----------------------------
function limparCamposEndereco() {
  endereco.value = "";
  bairro.value = "";
  cidade.value = "";
  estado.value = "";
}

// -----------------------------
// Eventos do campo CEP
// -----------------------------
if (cepInput) {
  cepInput.addEventListener("input", function () {
    mascaraCEP(this);

    // Busca automaticamente ao completar 8 dígitos numéricos
    if (this.value.replace(/\D/g, "").length === 8) {
      buscarCEP();
    }
  });
}

// -----------------------------
// Confirmação de senha
// -----------------------------
const senha = document.getElementById("senha");
const confSenha = document.getElementById("confsenha");
const form = document.querySelector(".form");
const mensagemErro = document.getElementById("mensagem-erro");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio automático
    mensagemErro.textContent = ""; // Limpa mensagens de erro anteriores
    mensagemErro.style.display = "none";

    if (senha.value !== confSenha.value) {
      alert("❌ As senhas não coincidem! Verifique e tente novamente.");
      senha.style.borderColor = "red";
      confSenha.style.borderColor = "red";
      return; // Para a execução se as senhas não batem
    } else {
      senha.style.borderColor = "green";
      confSenha.style.borderColor = "green";
      realizarCadastro();
    }
  });
}

// -----------------------------
//FUNÇÃO PARA CONFIRMAR CADASTRO
// -----------------------------

function realizarCadastro() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senhaValue = document.getElementById("senha").value;

  // Pega a lista de usuários existentes ou cria uma lista vazia
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se o e-mail já está em uso
  const emailExistente = usuarios.find((user) => user.email === email);

  if (emailExistente) {
    // Mostra a mensagem de erro personalizada na página
    mensagemErro.innerHTML = `Este e-mail já está cadastrado. <a href="login.html">Faça o login</a> ou use outro e-mail.`;
    mensagemErro.style.display = "block";
    document.getElementById("email").style.borderColor = "red";
  } else {
    // Adiciona o novo usuário à lista
    usuarios.push({ nome, email, senha: senhaValue });

    // Salva a lista atualizada no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert(
      "Cadastro realizado com sucesso! Você será redirecionado para a página de login."
    );
    window.location.href = "login.html";
  }
}

// -----------------------------
//Função para pegar os dados do local storage e comparar no login.js
// -----------------------------

function pegarDadosLocalStorage() {
  const userSalvo = localStorage.getItem("username");
  const senhaSalva = localStorage.getItem("password");

  return {
    usuario: userSalvo,
    senha: senhaSalva,
  };
}

// -----------------------------
// LÓGICA MODO ESCURO (já presente no arquivo, sem necessidade de alteração)
// -----------------------------
const toggle = document.getElementById("toggle");
const body = document.body;

if (toggle) {
  toggle.addEventListener("change", () => body.classList.toggle("dark-mode"));
}
