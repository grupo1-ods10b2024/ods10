import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Configuração do Firebase
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
const auth = getAuth(app);
const db = getFirestore(app);

// Elementos do DOM
const userWelcome = document.getElementById('user-welcome');
const loginLink = document.getElementById('login-link');
const cadastroLink = document.querySelector('a[href="cadastro.html"]'); // Seleciona o link de cadastro
const loginImg = document.getElementById('login-img');
const submenu = document.querySelector('.submenu');
const formLogin = document.getElementById('loginForm');

// Função para validar os campos do formulário
function validarCampos() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validação do email
  if (email === "") {
    alert("Por favor, preencha o campo email.");
    return false; // Impede o envio do formulário
  }

  // Validação da senha
  if (password === "") {
    alert("Por favor, insira sua senha.");
    return false; // Impede o envio do formulário
  }

  return true; // Permite o envio do formulário
}

// Função para buscar o nome do usuário no Firestore
async function buscarNomeUsuario(userId) {
  const userDoc = doc(db, "usuarios", userId);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    const nomeCompleto = userSnapshot.data().rm.nome; // A chave correta para o nome
    return nomeCompleto; // Retorna o nome completo
  } else {
    console.log("Usuário não encontrado no Firestore.");
    return null;
  }
}

// Função para lidar com o login
async function login(event) {
  event.preventDefault();

  if (!validarCampos()) {
    return; // Se a validação falhar, não prossegue com o login
  }

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Busca o nome do usuário após o login
    const nomeUsuario = await buscarNomeUsuario(user.uid);
    if (nomeUsuario) {
      localStorage.setItem("nomeUsuario", nomeUsuario); // Armazena o nome na sessão
      alert("Login realizado com sucesso!");
      window.location.href = "index.html"; // Redireciona após login
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    alert("Erro ao fazer login. Verifique suas credenciais.");
  }
}

// Função para fazer logout
async function logout() {
  try {
    await signOut(auth);
    localStorage.removeItem("nomeUsuario"); // Remove o nome da sessão
    alert("Logout realizado com sucesso!");
    window.location.href = "login.html"; // Redireciona para a página de login
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    alert("Erro ao sair. Tente novamente.");
  }
}

// Função para verificar o status do usuário ao carregar a página
function checkUserStatus() {
  const nomeUsuario = localStorage.getItem("nomeUsuario");

  if (nomeUsuario) {
    userWelcome.textContent = `Bem-vindo(a), ${nomeUsuario}`;
    userWelcome.style.display = "inline"; // Exibe a mensagem de boas-vindas
    loginLink.style.display = "none"; // Oculta o link "Entre"
    cadastroLink.style.display = "none"; // Oculta o link "Cadastre-se"
    submenu.style.display = "block"; // Exibe o submenu
  } else {
    userWelcome.style.display = "none"; // Oculta a mensagem de boas-vindas
    loginLink.style.display = "inline"; // Exibe o link "Entre"
    cadastroLink.style.display = "inline"; // Exibe o link "Cadastre-se"
    submenu.style.display = "none"; // Oculta o submenu
  }
}

// Adiciona eventos de login e logout ao formulário e botão, se existirem na página
if (formLogin) {
  formLogin.addEventListener("submit", login);
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

// Chamada da função ao carregar a página
checkUserStatus();

// Variável para controlar a visibilidade do submenu
let isSubmenuVisible = false;

// Exibir ou ocultar o submenu ao clicar na imagem
loginImg.addEventListener("click", function(event) {
  event.preventDefault(); // Evita o comportamento padrão do link
  isSubmenuVisible = !isSubmenuVisible; // Alterna o estado de visibilidade

  if (isSubmenuVisible) {
    submenu.style.display = "block"; // Exibe o submenu
  } else {
    submenu.style.display = "none"; // Oculta o submenu
  }
});

// Ocultar o submenu se clicar fora dele
document.addEventListener("click", function(event) {
  const isClickInside = loginImg.contains(event.target) || submenu.contains(event.target);
  if (!isClickInside) {
    submenu.style.display = "none"; // Oculta o submenu
    isSubmenuVisible = false; // Reseta o estado
  }
});
