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

/*function validac() {
  var nome = contato.nome.value;
  var email = contato.email.value;

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

  if (data == "") {
    alert("Por favor, Preencha o campo com a data!");
    contato.data.focus();
    return false;
  }
  // Se todas as validações forem válidas, envia os dados do formulário e exibe mensagem sem direcionar tela
  alert("Dados enviados com sucesso!");
  contato.reset(); //função JS reset campos
} */

/*FUNÇÃO DA PAGINA FORM.HTML */
function validaform() {
  var nome = document.getElementById("text1").value.trim();
  var data = document.getElementById("text2").value;
  var comentario = document.getElementById("textarea").value.trim();

  // Validação do nome
  if (nome === "") {
    alert("Por favor, preencha seu nome.");
    return false; // Impede o envio do formulário
  }

  // Validação da data
  if (data === "") {
    alert("Por favor, selecione uma data.");
    return false; // Impede o envio do formulário
  }

  // Validação do comentário
  if (comentario === "") {
    alert("Por favor, deixe um comentário.");
    return false; // Impede o envio do formulário
  }

  // Se todas as validações passarem
  return true; // Permite o envio do formulário
}

//FIM FUNÇÃO



// JS para acordeon da página faq:
$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    var links = this.el.find(".article-title");
    links.on(
      "click",
      {
        el: this.el,
        multiple: this.multiple,
      },
      this.dropdown
    );
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el;
    var $this = $(this); // Definindo $this corretamente
    var $next = $this.next();
    $next.slideToggle();
    $this.parent().toggleClass("open");
    if (!e.data.multiple) {
      $el
        .find(".accordion-content")
        .not($next)
        .slideUp()
        .parent()
        .removeClass("open");
    }
  };

  var accordion = new Accordion($(".accordion-container"), false);
});

// Fechamento do acordeon quando clicar fora
$(document).on("click", function (event) {
  if (!$(event.target).closest("#accordion").length) {
    $(".accordion-content").slideUp(); // Fecha todos os conteúdos
    $(".article-title").parent().removeClass("open"); // Remove a classe open
  }
});

//Sobre nós
document.querySelectorAll(".image-container").forEach((container) => {
  container.addEventListener("click", function () {
    if (this.classList.contains("ativa")) {
      this.classList.remove("ativa");
    } else {
      document
        .querySelectorAll(".image-container")
        .forEach((c) => c.classList.remove("ativa"));
      this.classList.add("ativa");
    }
  });
});

//pedir login para fazer solicitação (comentar essa parte para acessar sem login)
// Verifica se o usuário está logado
function isUserLoggedIn() {
  return !!localStorage.getItem("nomeUsuario"); // Retorna true se o nome estiver no localStorage
}

// Função para bloquear o acesso e redirecionar para login
function bloquearAcesso() {
  // Aplica a classe que adiciona o efeito de blur
  document.body.classList.add("blur");

  // Exibe o alerta para informar que é necessário fazer login
  alert("Você precisa fazer login para acessar esta página.");

  // Remove o efeito de blur e redireciona para a página de login
  document.body.classList.remove("blur");
  window.location.href = "login.html"; // Redireciona para a página de login
}

// Verifica se a página atual é protegida e se o usuário está logado
function verificarAcessoProtegido() {
  const paginasProtegidas = [
    "asks.html",
    "form.html",
    "status.html",
    "historico.html",
  ];

  // Obtém o nome da página atual
  const paginaAtual = window.location.pathname.split("/").pop();

  // Se a página atual for protegida e o usuário não estiver logado
  if (paginasProtegidas.includes(paginaAtual) && !isUserLoggedIn()) {
    bloquearAcesso(); // Bloqueia o conteúdo e redireciona para login
  }
}

// Chama a função de verificação ao carregar a página
verificarAcessoProtegido();

