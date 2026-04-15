const questions = document.querySelectorAll('.question');
let currentQuestion = 0;
let score = 0;
let respondido = false; 

const hoverSound = document.getElementById("hover-sound");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const celebrationSound = document.getElementById("celebration-sound");
const failedSound = document.getElementById("failed-sound");
const fala = document.getElementById("fala");
const mascote = document.getElementById("mascote");
const body = document.body;
const btn = document.getElementById("modeBtn");
const modeIcon = document.getElementById("modeIcon");

correctSound.volume = 0.3; 
wrongSound.volume = 0.5; 

const dicasPorPergunta = [

  {
    dicas: [
      "Pense em um método de pagamento instantâneo muito usado no Brasil.",
      "É feito por aplicativo e funciona 24 horas por dia."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "Esse recurso mostra quem enviou ou recebeu dinheiro em uma transação.",
      "Você pode acessá-lo no seu extrato do Pix."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "É um dos jeitos mais rápidos de enviar Pix.",
      "Envolve apenas tocar na tela, sem digitar nada."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "É usado para organizar informações de pagamentos recorrentes.",
      "Pode incluir datas, identificação e valores definidos."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "É uma das maneiras de identificar contas Pix.",
      "Pode ser um e-mail, CPF, CNPJ ou até número de celular."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "Esse recurso permite pagar algo apontando a câmera do celular.",
      "Geralmente envolve um código quadrado preto e branco."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "É a área do app onde você personaliza limites, chaves e segurança.",
      "Quase todos os bancos têm essa tela logo na página inicial do Pix."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "São mostrados no topo e no final do comprovante de pagamento.",
      "Incluem horário, valores e identificação da conta."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "Esse recurso detecta tentativas suspeitas antes de você fazer um Pix.",
      "Muitos bancos exibem alertas amarelos ou vermelhos quando algo parece estranho."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "Serve para copiar todos os dados de pagamento rapidamente.",
      "É muito usado quando alguém manda um código de pagamento por mensagem."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "Ajuda a organizar categorias de pagamentos feitos pelo Pix.",
      "Pode gerar relatórios ou mostrar quanto você gastou em cada tipo de compra."
    ],
    resposta: "Não desista você consegue."
  },

  {
    dicas: [
      "Esse comando finaliza um pagamento enviando o comprovante.",
      "Aparece logo após concluir um Pix e pode ser enviado por WhatsApp."
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

let saved = localStorage.getItem("theme");
    if (saved) applyTheme(saved);

    btn.addEventListener("click", () => {
        if (body.classList.contains("light")) {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
    });

    function applyTheme(mode) {

        body.className = mode;
        btn.className = "toggle " + mode;
        localStorage.setItem("theme", mode);
    }


function showQuestion(index) {
  questions.forEach((q, i) => {
    q.classList.remove('active');
    if (i === index) q.classList.add('active');
  });
  respondido = false; 
}

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

mascote.onmouseup = () => {
 
  if (balaoAtivo) return;

  balaoAtivo = true;

  if (tempoFala) {
    clearTimeout(tempoFala);
    tempoFala = null;
  }

  

  const dadosPergunta = dicasPorPergunta[currentQuestion];
  const indice = progressoDicas[currentQuestion];

  let dicaEscolhida;

 if (indice < dadosPergunta.dicas.length) {
    dicaEscolhida = dadosPergunta.dicas[indice];
    progressoDicas[currentQuestion]++; 
  } 
  
  else if (indice === dadosPergunta.dicas.length) {
    dicaEscolhida = dadosPergunta.resposta;
    progressoDicas[currentQuestion]++; 
  } 
  
  else {
    dicaEscolhida = dadosPergunta.dicas[0];
    progressoDicas[currentQuestion] = 1;
  }


  fala.textContent = dicaEscolhida;
  fala.style.display = "block";

  tempoFala = setTimeout(() => {
    fala.style.display = "none";
    balaoAtivo = false; 
    tempoFala = null;
  }, 2000);
};



function launchConfetti() {
  const duration = 4 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

const allOptions = document.querySelectorAll('.option');

allOptions.forEach(option => {
  
  option.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });

  option.addEventListener('click', () => {
    if (respondido) return; 
    respondido = true;

    const parentQuestion = option.closest('.question');
    const feedback = parentQuestion.querySelector('.feedback');
    const correct = option.dataset.correct === "true";

    parentQuestion.querySelectorAll('.option').forEach(o => o.classList.remove('correct', 'wrong'));
    option.classList.add(correct ? 'correct' : 'wrong');

    feedback.textContent = correct ? "✅ Correto!" : "❌ Errado!";

    if (correct) {
      correctSound.currentTime = 0;
      correctSound.play();
      score++;
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play();
    }

    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion);
      } else {
        showQuestion(questions.length - 1);
        const finalText = score >= 8 
          ? `🎉 Parabéns! Você acertou ${score} de ${questions.length - 1} perguntas!` 
          : `😢 Você acertou apenas ${score} de ${questions.length - 1} perguntas. Tente novamente!`;
        document.getElementById('final-score').textContent = finalText;
        if(score >= 7) celebrationSound.play();
        if(score >= 7) launchConfetti();
        if(score < 7) failedSound.play();
      }
    }, 1000);
  });
});

showQuestion(0);



