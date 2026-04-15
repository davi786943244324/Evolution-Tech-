document.addEventListener("DOMContentLoaded", () => {
    // Pega o botão para acessar o curso
    const botao = document.querySelector(".card-info button");

    botao.addEventListener("click", function (event) {
        const logado = localStorage.getItem("usuarioLogado");

        if (!logado) {
            event.preventDefault();
            alert("Entre na sua conta para acessar este curso!");

           // envia para tela de login quando clicar em OK
            window.location.href = "../login.html"; 
            return;
        } 
        else {
          // se estiver logado, o curso abre normalmente
            const link = this.querySelector("a");
            if (link) {
                window.location.href = link.href;
            }
        }
    });
});
