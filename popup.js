// Inicialização do DOM e do Firebase
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const popup = document.getElementById("popup");
    const botao = document.getElementById("confirma");

    // Função para validar os campos do formulário
    window.validarFormulario = function () {
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();

        if (nome === "") {
            alert("Por favor, preencha seu nome.");
            contactForm.nome.focus();
            return false; // Impede o envio do formulário
        }

        if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
            alert("Por favor, preencha um e-mail válido.");
            contactForm.email.focus();
            return false;
        }

        return true; // Permite o envio do formulário
    };

    // Função para abrir o popup
    function openPopup() {
        popup.classList.add("open-popup");
    }

    // Função para fechar o popup
    window.closePopup = function () {
        popup.classList.remove("open-popup");
    };

    // Função para lidar com o envio do formulário
    async function handleSubmit(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        const validacao = validarFormulario(); // Chama a função de validação

        if (validacao) {
            openPopup(); // Abre o popup de confirmação
        }
    }

    // Lidar com o clique do botão "Ok" no popup
    if (botao) {
        botao.addEventListener("click", async function () {
            await enviarAvaliacao(); // Envia a avaliação

            // Alert de sucesso para a avaliação
            alert("Sua avaliação foi registrada com sucesso!");

            // Enviar o formulário
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Formulário enviado com sucesso!'); // Alert de sucesso para o formulário
                    contactForm.reset(); // Reseta o formulário
                } else {
                    const errorData = await response.json();
                    alert(`Erro: ${errorData.errors.map(err => err.message).join(', ')}`);
                }
            } catch (error) {
                alert('Erro ao enviar o formulário. Tente novamente mais tarde.');
            }

            // Redireciona para a nova página após o segundo alert
            window.location.href = "avaliacoes.html";
        });
    }

    // Adiciona o evento de submit ao formulário
    if (contactForm) {
        contactForm.addEventListener("submit", handleSubmit);
    }
});

// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, doc, setDoc, increment } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB8NTkyPWhyzTxI26-6jAVIsTlWbLgUdNE",
    authDomain: "acessibilidade-etec.firebaseapp.com",
    projectId: "acessibilidade-etec",
    storageBucket: "acessibilidade-etec.appspot.com",
    messagingSenderId: "944602828507",
    appId: "1:944602828507:web:662cbe1bbfb330619d86fe",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let notaSelecionada = null; // Variável para armazenar a nota selecionada
const avaliacaoId = "Auovwu2JaJOR3jEscsfa"; // ID do documento para a avaliação

// Função para selecionar a nota
window.selecionarNota = function(nota) {
    notaSelecionada = nota; // Armazena a nota selecionada
    document.querySelectorAll('.mensagem').forEach(mensagem => {
        mensagem.style.display = 'none'; // Esconde todas as mensagens
    });
    document.getElementById(`mensagem${nota.charAt(0)}`).style.display = 'block'; // Mostra a mensagem da nota selecionada
}

// Função para enviar a avaliação
async function enviarAvaliacao() {
    if (notaSelecionada) {
        const notaRef = doc(db, 'avaliacoes', avaliacaoId); // Referência para o documento da avaliação
        try {
            await setDoc(notaRef, {
                [notaSelecionada]: increment(1) // Incrementa a nota selecionada
            }, { merge: true }); // Usa merge para atualizar sem apagar dados existentes
            console.log("Avaliação registrada com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar avaliação: ", error);
            alert("Erro ao registrar sua avaliação. Tente novamente mais tarde."); // Alerta de erro
        }
    } else {
        console.log("Nenhuma nota selecionada.");
        alert("Por favor, selecione uma nota antes de enviar."); // Alerta se nenhuma nota foi selecionada
    }
}
