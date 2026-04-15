document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA DO MODO ESCURO ---
  const toggle = document.getElementById("toggle");
  const body = document.body;

  if (toggle) {
    // Função para alternar o modo escuro
    const toggleDarkMode = () => {
      body.classList.toggle("escuro");
      const isDarkMode = body.classList.contains("escuro");
      toggle.checked = isDarkMode;
      localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    };

    // Adiciona o evento de mudança no checkbox
    toggle.addEventListener("change", toggleDarkMode);

    // Verifica a preferência salva ao carregar a página
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("escuro");
      toggle.checked = true;
    }
  }

  // --- LÓGICA DE AUTENTICAÇÃO E UI DO USUÁRIO LOGADO ---
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const btnCadastro = document.getElementById("btn-cadastro");
  const btnLogin = document.getElementById("btn-login");
  const welcomeUserSpan = document.getElementById("welcome-user");

  if (isLoggedIn) {
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    // Mostra a saudação no cabeçalho
    if (welcomeUserSpan && usuarioLogado && usuarioLogado.nome) {
      welcomeUserSpan.textContent = `Olá, ${usuarioLogado.nome}!`;
      welcomeUserSpan.style.display = "inline";
    }

    // Esconde o botão de cadastro
    if (btnCadastro) btnCadastro.style.display = "none";

    // Transforma o botão de login em "SAIR"
    if (btnLogin) {
      btnLogin.textContent = "SAIR";
      btnLogin.classList.remove("btn-acao");
      btnLogin.href = "#";
      btnLogin.onclick = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("usuarioLogado");
        alert("Você saiu da sua conta.");
        window.location.reload();
      };
    }
  }

  // --- LÓGICA DO MENU HAMBÚRGUER ---
  const menuBtn = document.querySelector(".menu-toggle");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      document.body.classList.toggle("menu-aberto");
    });
  }
});
