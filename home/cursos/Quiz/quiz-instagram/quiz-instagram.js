// Seleção de elementos principais do quiz
const questions = document.querySelectorAll('.question');
let currentQuestion = 0;
let score = 0;
let respondido = false; 

// Sons utilizados no jogo
const hoverSound = document.getElementById("hover-sound");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const celebrationSound = document.getElementById("celebration-sound");
const failedSound = document.getElementById("failed-sound");

// Elementos do mascote e tema
const fala = document.getElementById("fala");
const mascote = document.getElementById("mascote");
const body = document.body;
const btn = document.getElementById("modeBtn");
const modeIcon = document.getElementById("modeIcon");

// Volumes ajustados
correctSound.volume = 0.3; 
wrongSound.volume = 0.5; 

/* Lista com dicas e respostas finais associadas a cada pergunta */
const dicasPorPergunta = [

  {
    dicas: [
      "Pense em um programa voltado para digitação e formatação de textos.",
      "Não é uma planilha nem uma apresentação, é um editor de texto.",
    ],
    resposta: "Não desista você consegue."
  },
 
  {
    dicas: [
      "Esse recurso serve para acompanhar quem fez mudanças no texto.",
      "Fica na guia 'Revisão'.",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Pense em um atalho comum para salvar documentos.",
      "É usado também em outros programas da Microsoft.",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Esse recurso ajuda a organizar itens um após o outro.",
      "Você pode escolher números, pontos ou símbolos para cada item.",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Esse recurso divide o texto em partes verticais.",
      "É usado em jornais e revistas para organizar o conteúdo.",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Procure na guia 'Inserir' algo relacionado a imagens.",
      "Você pode escolher entre imagens do computador ou da internet.",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Essa guia tem opções para mudar a aparência do texto.",
      "É a primeira guia do Word.",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Esses elementos aparecem no topo e no rodapé das páginas.",
      "Você os encontra na guia 'Inserir'.",
    ],
    resposta: "Não desista você consegue."
  },
 
  {
    dicas: [
      "Esse recurso ajuda a encontrar erros de escrita automaticamente.",
      "O Word costuma sublinhar palavras erradas com linhas vermelhas.",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Esse atalho é usado para duplicar o texto selecionado.",
      "Você provavelmente usa esse comando com frequência!",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Pense em algo relacionado à formatação automática de títulos.",
      "Ajuda a criar sumários automáticos.",
    ],
    resposta: "Não desista você consegue."
  },
  
  {
    dicas: [
      "Esse comando imprime o documento.",
      "Fica em Arquivo → Imprimir ou usa o atalho Ctrl + P.",
    ],
    resposta: "Não desista você consegue."
  }
];

// Botão menu hamburguer
const menuBtn = document.querySelector('.menu-toggle');

menuBtn.addEventListener('click', () => {
  document.body.classList.toggle('menu-aberto'); // abre/fecha menu
});

// Fecha o menu quando clicar em algum link
document.querySelectorAll('.sub-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
     if (window.innerWidth <= 768) {
      document.body.classList.remove('menu-aberto');
    }
  });
});

/* Carrega e aplica o tema salvo (claro/escuro) */
let saved = localStorage.getItem("theme");
    if (saved) applyTheme(saved);

    btn.addEventListener("click", () => {
        if (body.classList.contains("light")) {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
    });

/* Função que aplica o tema e salva no localStorage */
    function applyTheme(mode) {

        body.className = mode;
        btn.className = "toggle " + mode;
        localStorage.setItem("theme", mode);
    }

/* Exibe a pergunta atual e esconde as outras */
function showQuestion(index) {
  questions.forEach((q, i) => {
    q.classList.remove('active');
    if (i === index) q.classList.add('active');
  });
  respondido = false; 
}

/* Mensagem inicial do mascote ao carregar a página */
window.addEventListener("load", () => {
  fala.textContent = "Sou seu ajudante! Pode me usar quando estiver com dúvida 😄";
  fala.style.display = "block";
  balaoAtivo = true;

  tempoFala = setTimeout(() => {
    fala.style.display = "none";
    balaoAtivo = false;
  }, 2000);
});

let balaoAtivo = false;
let tempoFala = null; 
let progressoDicas = new Array(dicasPorPergunta.length).fill(0);

// Evento ao soltar o clique no mascote: exibe dicas ou resposta*/
mascote.onmouseup = () => {
 
  if (balaoAtivo) return; // Impede múltiplos balões simultâneos

  balaoAtivo = true; // Marca que o balão está ativo

  if (tempoFala) {
    clearTimeout(tempoFala); // Remove timeout anterior se existir
    tempoFala = null;
  }
  const dadosPergunta = dicasPorPergunta[currentQuestion]; // Pega as dicas da pergunta atual
  const indice = progressoDicas[currentQuestion]; // Verifica o progresso das dicas

  let dicaEscolhida;

 // Se ainda existem dicas, mostra a próxima 
 if (indice < dadosPergunta.dicas.length) {
    dicaEscolhida = dadosPergunta.dicas[indice];
    progressoDicas[currentQuestion]++;  // Avança para a próxima dica
  } 
 
 // Quando acabar as dicas, mostra a resposta final 
  else if (indice === dadosPergunta.dicas.length) {
    dicaEscolhida = dadosPergunta.resposta;
    progressoDicas[currentQuestion]++; 
  } 
  
 // Se ultrapassar o limite, reinicia no começo das dicas 
  else {
    dicaEscolhida = dadosPergunta.dicas[0];
    progressoDicas[currentQuestion] = 1;
  }


  fala.textContent = dicaEscolhida; // Mostra dica no balão
  fala.style.display = "block"; // Exibe o balão

  // Esconde o balão após 2 segundos
  tempoFala = setTimeout(() => {
    fala.style.display = "none";
    balaoAtivo = false; 
    tempoFala = null;
  }, 2000);
};


// Função que dispara o efeito de confete
function launchConfetti() {
  const duration = 4 * 1000;
  const end = Date.now() + duration;

  // Confete vindo da esquerda
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });

  // Confete vindo da direita  
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

  // Continua chamando enquanto o tempo não acabou  
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

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

    // Após 1 segundo avança para a próxima pergunta
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion); // Mostra próxima
      } else {
        showQuestion(questions.length - 1);
        const finalText = score >= 8 
          ? `🎉 Parabéns! Você acertou ${score} de ${questions.length - 1} perguntas!` 
          : `😢 Você acertou apenas ${score} de ${questions.length - 1} perguntas. Tente novamente!`;
        document.getElementById('final-score').textContent = finalText;
        if(score >= 7) celebrationSound.play(); // Som de vitória
        if(score >= 7) launchConfetti(); // Confete
        if(score < 7) failedSound.play(); // Som de falha
      }
    }, 1000);
  });
});
// Mostra a primeira pergunta ao iniciar o quiz
showQuestion(0);



