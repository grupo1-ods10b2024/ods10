// Máscara para RG
document.getElementById("rg").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (value.length > 9) {
    value = value.slice(0, 9); // Limita o comprimento para 9 dígitos
  }
  if (value.length > 0) {
    // Adiciona a formatação
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d?)/, "$1.$2.$3-$4");
  }
  e.target.value = value;
});

// Máscara para CPF
document.getElementById("cpf").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (value.length > 11) {
    value = value.slice(0, 11); // Limita o comprimento
  }
  e.target.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d?)/, "$1.$2.$3-$4");
});

// Máscara para Telefone
document.getElementById("phone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (value.length > 11) {
    value = value.slice(0, 11); // Limita o comprimento
  }
  if (value.length > 6) {
    e.target.value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (value.length > 2) {
    e.target.value = value.replace(/(\d{2})(\d{4})/, "($1) $2");
  } else {
    e.target.value = value;
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8NTkyPWhyzTxI26-6jAVIsTlWbLgUdNE",
  authDomain: "acessibilidade-etec.firebaseapp.com",
  projectId: "acessibilidade-etec",
  storageBucket: "acessibilidade-etec.appspot.com",
  messagingSenderId: "944602828507",
  appId: "1:944602828507:web:662cbe1bbfb330619d86fe",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o Firestore e o Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Referência ao formulário
const form = document.getElementById("registerForm");

// Função para avisar que foi cadastrado com sucesso
function success() {
  alert("Dados cadastrados com sucesso!");
}

// Função para avisar que os dados não foram enviados
function error() {
  alert("ERRO, Tente Novamente!");
}

// Função para validar o formulário
function validar() {
  var nome = form.elements["fullName"].value;
  var email = form.elements["email"].value;
  var rg = form.elements["rg"].value;
  var cpf = form.elements["cpf"].value;
  var rm = form.elements["rm"].value;
  var phone = form.elements["phone"].value;
  var deficiency = form.elements["deficiency"].value;
  var medicalReport = form.elements["medicalReport"].value;
  var password = form.elements["password"].value;
  var confirmPassword = form.elements["confirmPassword"].value;

  if (nome == "") {
    alert("Por favor, preencha o campo com seu nome completo!");
    form.elements["fullName"].focus();
    return false;
  }
  if (email == "") {
    alert("Por favor, preencha o campo com seu email!");
    form.elements["email"].focus();
    return false;
  }
  if (rg == "") {
    alert("Por favor, preencha o campo com seu RG!");
    form.elements["rg"].focus();
    return false;
  }
  if (cpf == "") {
    alert("Por favor, preencha o campo com seu CPF!");
    form.elements["cpf"].focus();
    return false;
  }
  if (rm == "") {
    alert("Por favor, preencha o campo com seu RM!");
    form.elements["rm"].focus();
    return false;
  }
  if (phone == "") {
    alert("Por favor, preencha o campo com seu telefone!");
    form.elements["phone"].focus();
    return false;
  }
  if (deficiency == "") {
    alert("Por favor, selecione o tipo de deficiência!");
    form.elements["deficiency"].focus();
    return false;
  }
  if (medicalReport == "") {
    alert("Por favor, envie o laudo médico!");
    form.elements["medicalReport"].focus();
    return false;
  }
  if (password == "") {
    alert("Por favor, crie uma senha!");
    form.elements["password"].focus();
    return false;
  }
  if (confirmPassword == "") {
    alert("Por favor, confirme sua senha!");
    form.elements["confirmPassword"].focus();
    return false;
  }

  if (password !== confirmPassword) {
    alert("As senhas devem ser iguais!");
    form.elements["password"].focus();
    form.elements["confirmPassword"].focus();
    return false;
  }

  // Se todas as validações forem válidas
  return true; // Retorna true se tudo estiver ok
}

// Função para criar um usuário no Firebase Authentication
async function criarUsuario(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Retorna o objeto do usuário
  } catch (error) {
    console.error("Erro ao criar usuário: ", error);
    throw error; // Lança o erro para ser tratado em outra parte do código
  }
}

// Função para escrever dados no Firestore
async function escreverDadosNoFirestore(usuario) {
  const usuarioDocRef = doc(db, "usuarios", usuario.uid); // Usa o UID do usuário para o documento
  await setDoc(usuarioDocRef, {
    rm: {
      nome: form.elements["fullName"].value,
      rg: form.elements["rg"].value,
      cpf: form.elements["cpf"].value,
      phone: form.elements["phone"].value,
      deficiency: form.elements["deficiency"].value,
      medicalReport: form.elements["medicalReport"].value,
      email: form.elements["email"].value,
      conta: "user",
      date: form.elements["birthDate"].value, 
    },
  });
}

// Função para cadastrar o usuário
async function cadastrar(event) {
  event.preventDefault(); // Evita o envio tradicional do formulário

  // Valida o formulário antes de enviar
  if (!validar()) {
    return; // Se algum campo estiver vazio, interrompe o envio
  }

  try {
    // Cria o usuário no Firebase Authentication
    const usuario = await criarUsuario(
      form.elements["email"].value,
      form.elements["password"].value
    );

    // Escreve os dados no Firestore
    await escreverDadosNoFirestore(usuario);

    console.log("Documento escrito com sucesso!");
    success();
    form.reset(); // Reseta os campos do formulário
    window.location.href = "login.html"; // Redirecionar para a página
  } catch (e) {
    console.error("Erro ao cadastrar usuário: ", e);
    error();
  }
}

// Adiciona evento de submissão ao formulário
form.addEventListener("submit", cadastrar);


