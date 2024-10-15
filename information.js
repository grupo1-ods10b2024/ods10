import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
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

// Função para buscar as informações do usuário
async function getUserData(userId) {
  const docRef = doc(db, "usuarios", userId); // Caminho correto para o documento do usuário
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().rm; // Acessa o subdocumento 'rm' e retorna os dados
  } else {
    console.log("Nenhum dado encontrado!");
    return null;
  }
}

// Função para preencher a tabela com os dados do usuário
function fillTable(userData) {
  const tableBody = document.getElementById("user-info");
  tableBody.innerHTML = `
    <tr><td>Nome</td><td>${userData.nome}</td></tr>
    <tr><td>CPF</td><td>${userData.cpf}</td></tr>
    <tr><td>RG</td><td>${userData.rg}</td></tr>
    <tr><td>Data de Nascimento</td><td>${userData.date}</td></tr>
    <tr><td>Deficiência</td><td>${userData.deficiency}</td></tr>
    <tr><td>Email</td><td>${userData.email}</td></tr>
    <tr><td>Telefone</td><td>${userData.phone}</td></tr>
    <tr><td>Laudo Médico</td><td>${userData.medicalReport}</td></tr>
    <tr><td>Tipo de Conta: </td><td>${userData.conta}</td></tr>
  `;
}

// Verifica se o usuário está autenticado e carrega os dados
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await getUserData(user.uid);
    if (userData) {
      fillTable(userData);
    } else {
      alert("Erro ao carregar as informações do usuário.");
    }
  } else {
    window.location.href = "login.html"; // Redireciona para login se não autenticado
  }
});
