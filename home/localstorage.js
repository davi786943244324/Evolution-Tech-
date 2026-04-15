// Script de Autenticação para proteger páginas

const isLoggedIn = sessionStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  const jaSouAluno = confirm(
    "Para acessar, você precisa estar logado.\n\nClique em 'OK' se já for aluno, ou 'Cancelar' para se cadastrar."
  );

  if (jaSouAluno) {
    // Se o usuário clicar em "OK", redireciona para o login
    window.location.href = "/login.html";
  } else {
    // Se o usuário clicar em "Cancelar", redireciona para o cadastro
    window.location.href = "/cadastro.html";
  }
}
