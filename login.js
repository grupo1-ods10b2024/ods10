import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

// Inicializando o Firebase Authentication
const auth = getAuth(app);

// Inicializando o Firebase Firestore
const db = getFirestore(app);

// Referência ao formulário de login
const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logoutButton"); // Botão de logout

// Função para validar campos do formulário
function validarCampos() {
    const email = loginForm.elements["email"].value;
    const password = loginForm.elements["password"].value;

    if (email === "") {
        alert("Por favor, preencha o campo de e-mail.");
        return false;
    }
    if (password === "") {
        alert("Por favor, preencha o campo de senha.");
        return false;
    }
    return true;
}

// Função para buscar o nome do usuário no Firestore
async function buscarNomeUsuario(userId) {
    const userDoc = doc(db, "usuarios", userId); // Substitua "usuarios" pelo nome da sua coleção
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
        return userSnapshot.data().rm.name; // Acesse o nome usando 'rm.name'
    } else {
        console.log("Usuário não encontrado no Firestore.");
        return null;
    }
}

// Função para atualizar o cabeçalho
function updateHeader(userName) {
    const headerRight = document.querySelector('.header-right');
    headerRight.innerHTML = `<p>Bem-Vindo, ${userName}</p><button id="logoutButton">Sair</button>`;
}

// Função para limpar o cabeçalho
function clearHeader() {
    const headerRight = document.querySelector('.header-right');
    headerRight.innerHTML = `<p><a href="login.html">Entre</a> | <a href="cadastro.html">Cadastre-se</a></p>`;
}

// Função para lidar com o login
async function login(event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    // Valida os campos do formulário
    if (!validarCampos()) {
        return; // Se algum campo estiver vazio, interrompe o envio
    }

    const email = loginForm.elements["email"].value;
    const password = loginForm.elements["password"].value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Buscar o nome do usuário
        const nomeUsuario = await buscarNomeUsuario(user.uid);
        if (nomeUsuario) {
            updateHeader(nomeUsuario); // Atualiza o cabeçalho com o nome do usuário
            console.log("Usuário logado com sucesso:", user);
            alert("Login realizado com sucesso!");
            // Redirecionar para outra página após o login bem-sucedido
            window.location.href = "index.html"; // Redireciona para a página inicial
        }

    } catch (error) {
        console.error("Erro ao fazer login:", error.message); // Exibe a mensagem de erro
        alert("Erro ao fazer login. Verifique suas credenciais.");
    }
}

// Função para fazer logout
async function logout() {
    try {
        await signOut(auth);
        console.log("Usuário deslogado com sucesso!");
        alert("Você saiu da sua conta!");
        clearHeader(); // Limpa o cabeçalho ao sair
        // Redirecionar para a página de login ou para a página inicial
        window.location.href = "login.html"; // Altere para a página desejada
    } catch (error) {
        console.error("Erro ao fazer logout:", error.message);
        alert("Erro ao sair. Tente novamente.");
    }
}

// Adiciona eventos de submissão aos formulários
if (loginForm) {
    loginForm.addEventListener("submit", login);
}

if (logoutButton) {
    logoutButton.addEventListener("click", logout);
}
