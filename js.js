jQuery(window).scroll(function () {
  var scroll = jQuery(window).scrollTop();
  if (scroll >= 200) {
    jQuery(".back-to-top").removeClass("hidden");
  } else {
    jQuery(".back-to-top").addClass("hidden");
  }
});
jQuery(document).ready(function () {
  jQuery(".back-to-top").click(function () {
    jQuery("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});

// bglh de deficiente de cor dos óio

function toggleDropdown() {
  var dropdown = document.getElementById("colorDropdown");
  var button = document.getElementById("accessibilityBtn");
  dropdown.classList.toggle("show");
  button.classList.toggle("active");
}

function applyFilter(type) {
  var htmlElement = document.documentElement;
  var filter = "none";
  switch (type) {
    case "protanopia":
      filter = "url(#protanopia-filter)";
      break;
    case "deuteranopia":
      filter = "url(#deuteranopia-filter)";
      break;
    case "tritanopia":
      filter = "url(#tritanopia-filter)";
      break;
  }
  htmlElement.style.filter = filter;
  toggleDropdown();
}

document.addEventListener("click", function (event) {
  var dropdown = document.getElementById("colorDropdown");
  var button = document.getElementById("accessibilityBtn");
  if (!event.target.closest(".accessibility-wrapper")) {
    dropdown.classList.remove("show");
    button.classList.remove("active");
  }
});

// FIM - bglh de deficiente de cor dos óio

// Validação do CONTACT.HTML

function validac() {
  var nome = contato.nome.value;
  var email = contato.email.value;
  var nota = contato.nota.value;

  if (nome == "") {
    alert("Por favor, Preencha o campo com seu nome!");
    contato.nome.focus();
    return false;
  }
  if (email == "") {
    alert("Preencha o campo com seu email");
    contato.email.focus();
    return false;
  }
  if (nota == "") {
    alert("Preencha o campo com a nota do site por favor!");
    contato.nota.focus();
    return false;
  }
  // Se todas as validações forem válidas, envia os dados do formulário e exibe mensagem sem direcionar tela
  alert("Dados enviados com sucesso!");
  contato.reset(); //função JS reset campos
}

//FIM FUNÇÃO

// envio do formulário e pop up de avaliação
function handleSubmit(event) {
  const validacao = validac(); // Armazena o resultado da validação

  if (validacao) {
    contact.submit(); // Envia o formulário
    localStorage.setItem("formSubmitted", "true"); // Sinaliza que o formulário foi enviado
  } else {
    event.preventDefault(); // Impede o envio do formulário se a validação falhar
  }
}

document.addEventListener("DOMContentLoaded", function () {
  function validac() {
    var nome = contact.nome.value;
    var email = contact.email.value;

    if (nome === "") {
      alert("Por favor, preencha o campo com seu nome!");
      contact.nome.focus();
      return false;
    }

    if (email === "") {
      alert("Preencha o campo com seu e-mail!");
      contact.email.focus();
      return false;
    }

    return true; // Retorna verdadeiro se todas as validações passarem
  }

  let popup = document.getElementById("popup");

  function openPopup() {
    popup.classList.add("open-popup");
  }

  function closePopup() {
    popup.classList.remove("open-popup"); // Remove a classe que exibe o pop-up
    localStorage.removeItem("formSubmitted"); // Limpa a sinalização de que o formulário foi enviado
  }

  function handleSubmit(event) {
    const validacao = validac(); // Armazena o resultado da validação

    if (validacao) {
      contact.submit(); // Envia o formulário
      localStorage.setItem("formSubmitted", "true"); // Sinaliza que o formulário foi enviado
    } else {
      event.preventDefault(); // Impede o envio do formulário se a validação falhar
    }
  }

  // Verifica se o formulário foi enviado ao carregar a página
  if (localStorage.getItem("formSubmitted") === "true") {
    setTimeout(() => {
      openPopup(); // Abre o pop-up após 1 segundos
    }, 500); // 1000 milissegundos = 1 segundos
  }
  // Seleciona o botão pelo ID
  const botao = document.getElementById("confirma");

  // Adiciona um ouvinte de evento para o clique
  botao.addEventListener("click", function () {
    closePopup();
    // Aqui você pode adicionar qualquer outra lógica que deseja executar
  });
  // Adiciona o evento de submissão ao formulário
  document
    .querySelector("form[name='contact']")
    .addEventListener("submit", handleSubmit);
});

/*Animação dos emojis*/
const botao1 = document.querySelector(".bnt-nota1");
const botao2 = document.querySelector(".bnt-nota2");
const botao3 = document.querySelector(".bnt-nota3");
const botao4 = document.querySelector(".bnt-nota4");
const botao5 = document.querySelector(".bnt-nota5");

const mensagens = {
  bntNota1: "Excelente<br>Ficamos felizes que você tenha gostado!",
  bntNota2: "Bom<br>Obrigado pelo feedback!",
  bntNota3: "Razoável<br>Podemos melhorar!",
  bntNota4: "Ruim<br>Lamentamos pela experiência!",
  bntNota5: "Muito Ruim<br>Por favor, nos ajude a melhorar!",
};

document.querySelectorAll(".botao").forEach((botao) => {
  botao.addEventListener("mouseenter", () => {
    botao.style.order = "0"; // Move o botão para a frente
    // Esconde os outros botões
    document.querySelectorAll(".botao").forEach((b) => {
      if (b !== botao) {
        b.style.display = "none";
      }
    });
  });

  botao.addEventListener("mouseleave", () => {
    botao.style.order = ""; // Retorna a posição do botão
    document.querySelectorAll(".botao").forEach((b) => {
      b.style.display = ""; // Mostra todos os botões novamente
    });
  });
});
