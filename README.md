TECH PARA TODOS

Projeto web desenvolvido com o objetivo de ajudar pessoas idosas a aprender e utilizar tecnologias de forma simples, acessível e intuitiva.

DESCRIÇÃO

Esta aplicação foi criada para promover a inclusão digital, oferecendo conteúdos educativos e uma navegação simplificada para usuários com pouca experiência em tecnologia.

FUNCIONALIDADE:

Conteúdos educativos sobre tecnologia
Interface simples e intuitiva
Navegação fácil para iniciantes
Foco em acessibilidade

TECONOLOGIA UTILIZADAS:

HTML5
CSS3
JavaScript (ES6+)

PRÉ-REQUISITOS
Navegador atualizado (Google Chrome, Edge, etc)

INSTALAÇÃO:

Clone o repositório: git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
Acesse a pasta do projeto:cd NOME-DO-REPOSITORIO
Abra o arquivo index.html no navegador

COMO USAR:
Acesse a página inicial
Navegue pelos conteúdos disponíveis
Siga as instruções apresentadas na tela

PREVIEW DO PROJETO:
Menu de cadastro validando cpf:

<img width="934" height="932" alt="image" src="https://github.com/user-attachments/assets/9172fe9e-a9b0-4d7c-952c-172789e2987f" />

LÓGICA POR DE TRÁS:

Espefificando como tem que ser o formato do CPF

```html
<label for="cpf">CPF:</label>
<input type="text" pattern="[0-9]*" id="cpf" name="cpf" minlength="11" maxlength="11"
placeholder="Digite o CPF" required>
```

Validando o CPF:
```javascript
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
```
Menu de cadastro validando CEP:

<img width="958" height="921" alt="image" src="https://github.com/user-attachments/assets/a0718bd4-283a-4215-8635-e29b26a3f222" />

LÓGICA POR DE TRÁS:
```javascript
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
```
Quiz do Projeto:

<img width="1737" height="917" alt="image" src="https://github.com/user-attachments/assets/d5709f2b-7d92-4b56-812b-43a1d7656076" />

<img width="1439" height="921" alt="image" src="https://github.com/user-attachments/assets/afcda1ea-503e-4e32-8d0b-803bcbca906b" />


LÓGICA POR DE TRÁS DOS ERROS E ACERTOS:

Parte visual
```html
 <div class="question active"> <!-- Pergunta 1 ativa -->
      <img src="../img/instagram.jpg"> <!-- Imagem ilustrativa -->
      <h2>Qual é a principal função do Instagram?</h2> <!-- Texto da pergunta -->
      <div class="option" data-correct="true">Compartilhar fotos e vídeos</div> <!-- Opção correta -->
      <div class="option" data-correct="false">Enviar e-mails</div> <!-- Opção errada -->
      <div class="option" data-correct="false">Fazer planilhas</div>
      <div class="option" data-correct="false">Criar apresentações</div>
      <div class="feedback"></div> <!-- Feedback de acerto/erro -->
    </div>
```
Lógica em js do certo e do errado

```javascript
// Seleciona todas as opções do quiz
const allOptions = document.querySelectorAll('.option');

allOptions.forEach(option => {

  // Som ao passar o mouse por cima
  option.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });

  // Evento ao clicar na opção
  option.addEventListener('click', () => {
    if (respondido) return; // Evita clicar mais de uma vez
    respondido = true;

    const parentQuestion = option.closest('.question'); // Pergunta atual
    const feedback = parentQuestion.querySelector('.feedback'); // Área do feedback
    const correct = option.dataset.correct === "true"; // Verifica se está correta

    // Remove estilos antigos
    parentQuestion.querySelectorAll('.option').forEach(o => o.classList.remove('correct', 'wrong'));
    
    // Adiciona classe correta ou errada
    option.classList.add(correct ? 'correct' : 'wrong');

    // Mostra mensagem de acerto/erro
    feedback.textContent = correct ? "✅ Correto!" : "❌ Errado!";

    // Toca som correspondente e aumenta pontuação caso correto
    if (correct) {
      correctSound.currentTime = 0;
      correctSound.play();
      score++;
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }
```
ESTRUTURA DO PROJETO:

/home → páginas principais

/img → imagens do sobre nós

/cursos → cursos que explicam sobre instagram, youtube, power bi, etc...

/cursos/quiz → quiz que testa o seu conhecimento sobre os cursos


STATUS DO PROJETO:

Em desenvolvimento



AUTORES:

Junia

Lucas Machado

Samuel Romero

Rayane

Vitoria

Victor Ribeiro



LICENÇA:

Este projeto está sob a licença Evolution Tech.
