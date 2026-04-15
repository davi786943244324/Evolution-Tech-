document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("iemail");
  const telefoneInput = document.getElementById("telefone");
  const mensagemInput = document.getElementById("mensagem");

  // Função para exibir mensagem de erro
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorSpan = formGroup.querySelector(".error-message");
    errorSpan.textContent = message;
    input.style.borderColor = "red";
  }

  // Função para limpar mensagem de erro
  function clearError(input) {
    const formGroup = input.parentElement;
    const errorSpan = formGroup.querySelector(".error-message");
    errorSpan.textContent = "";
    input.style.borderColor = "#f28705";
  }

  // Função para validar o formulário
  function validateForm(event) {
    event.preventDefault();
    let isValid = true;

    // Limpa erros anteriores
    clearError(nomeInput);
    clearError(emailInput);
    clearError(telefoneInput);
    clearError(mensagemInput);

    // Regex para validação
    const nomeRegex = /^[a-zA-Z\s]{3,}$/; // Pelo menos 3 letras e espaços
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/; // Formato (xx) xxxxx-xxxx

    // Validação do Nome
    if (nomeInput.value.trim() === "") {
      showError(nomeInput, "Por favor, preencha o campo nome.");
      isValid = false;
    } else if (!nomeRegex.test(nomeInput.value)) {
      showError(nomeInput, "Por favor, insira um nome válido (apenas letras).");
      isValid = false;
    }

    // Validação do E-mail
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Por favor, preencha o campo e-mail.");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, "Por favor, insira um e-mail válido.");
      isValid = false;
    }

    // Validação do Telefone
    if (telefoneInput.value.trim() === "") {
      showError(telefoneInput, "Por favor, preencha o campo telefone.");
      isValid = false;
    } else if (!telefoneRegex.test(telefoneInput.value)) {
      showError(
        telefoneInput,
        "Formato de telefone inválido. Use (xx) xxxxx-xxxx."
      );
      isValid = false;
    }

    // Validação da Mensagem
    if (mensagemInput.value.trim() === "") {
      showError(mensagemInput, "Por favor, digite sua mensagem.");
      isValid = false;
    }

    if (isValid) {
      alert("Formulário enviado com sucesso!");
      form.submit();
    }
  }

  // Máscara para o campo de telefone
  telefoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value.slice(0, 15);
  });

  // Adiciona o "escutador" de evento ao formulário
  form.addEventListener("submit", validateForm);
});
