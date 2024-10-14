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
  var data = contato.data.value;

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
}
/*FUNÇÃO DA PAGINA FORM.HTML */
function validaform() {
  var nome = document.getElementById('text1').value.trim();
  var data = document.getElementById('text2').value;
  var comentario = document.getElementById('textarea').value.trim();

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

  /*Animação dos emojis*/
// Seleciona todos os botões e as mensagens
document.querySelectorAll('.nota button').forEach((button) => {
  button.addEventListener('click', function() {
      // Esconde todos os botões exceto o que foi clicado
      document.querySelectorAll('.nota button').forEach(btn => {
          if (btn !== button) { // Se não for o botão clicado
              btn.style.display = 'none'; // Esconde os outros botões
          } else {
              btn.classList.add('clicked'); // Adiciona uma classe ao botão clicado
          }
      });

      // Mostra a mensagem correspondente
      const mensagemId = 'mensagem' + button.className.match(/\d+/)[0]; // Captura o número do botão
      document.getElementById(mensagemId).style.display = 'block'; // Mostra a mensagem correspondente
  });
});

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
    ($this = $(this)), ($next = $this.next());
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

$(document).on("click", function (event) {
  if (!$(event.target).closest("#accordion").length) {
    $this.parent().toggleClass("open");
  }
});


//Sobre nós
document.querySelectorAll('.image-container').forEach(container => {
  container.addEventListener('click', function() {
      if (this.classList.contains('active1')) {
          this.classList.remove('active1');
      } else {
          document.querySelectorAll('.image-container').forEach(c => c.classList.remove('active1'));
          this.classList.add('active1');
      }
  });
});
