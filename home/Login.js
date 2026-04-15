document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const mensagemErro = document.getElementById("mensagem-erro-login");

  // Escuta o evento de 'submit' do formulário, que é mais robusto
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    // Limpa mensagens de erro anteriores
    mensagemErro.textContent = "";
    usernameInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    const email = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
      mensagemErro.textContent = "Por favor, preencha o e-mail e a senha.";
      return;
    }

    // --- Validação de Login ---
    // 1. Pega a lista de usuários cadastrados no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 2. Procura um usuário com o e-mail fornecido
    const usuarioEncontrado = usuarios.find((user) => user.email === email);

    if (!usuarioEncontrado) {
      // 3. Se o usuário não for encontrado
      mensagemErro.textContent =
        "Usuário inválido. Verifique o e-mail digitado.";
      usernameInput.style.borderColor = "red";
      return;
    }

    if (usuarioEncontrado.senha !== password) {
      // 4. Se a senha estiver incorreta
      mensagemErro.textContent = "Senha inválida. Tente novamente.";
      passwordInput.style.borderColor = "red";
      return;
    }

    // 5. Se o login for bem-sucedido
    sessionStorage.setItem("isLoggedIn", "true"); // Salva o status de login
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado)); // Salva os dados do usuário
    sessionStorage.setItem("showWelcomePopup", "true"); // Sinaliza para mostrar o pop-up
    alert("Login realizado com sucesso! Redirecionando para a página inicial.");
    window.location.href = "index.html"; // Redireciona para a página principal
  });

  // --- LÓGICA DO MODO ESCURO ---
  const toggle = document.getElementById("toggle");
  const body = document.body;
  const loginTitle = document.getElementById("login-title");

  // Função para alternar o modo escuro
  const toggleDarkMode = () => {
    body.classList.toggle("escuro");
    const isDarkMode = body.classList.contains("escuro");
    toggle.checked = isDarkMode;
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  };

  // Adiciona o evento de clique no título
  if (loginTitle) {
    loginTitle.addEventListener("click", toggleDarkMode);
  }

  // Adiciona o evento de mudança no checkbox
  toggle.addEventListener("change", toggleDarkMode);

  // Verifica a preferência salva ao carregar a página
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("escuro");
    toggle.checked = true;
  }
});
