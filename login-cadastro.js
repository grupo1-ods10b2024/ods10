// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();

// Função para registrar o usuário
document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  const fullName = document.getElementById('fullName').value;
  const birthDate = document.getElementById('birthDate').value;
  const rg = document.getElementById('rg').value;
  const cpf = document.getElementById('cpf').value;
  const rm = document.getElementById('rm').value;
  const phone = document.getElementById('phone').value;
  const deficiency = document.getElementById('deficiency').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      // Criar um novo usuário com email e senha
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Adicionando os dados ao Firestore
      await addDoc(collection(db, 'usuarios'), {
          fullName,
          birthDate,
          rg,
          cpf,
          rm,
          phone,
          deficiency,
          email,
          uid: user.uid // Armazenar o ID do usuário
      });
      alert('Cadastro realizado com sucesso!');
      document.getElementById('registerForm').reset(); // Limpa o formulário
  } catch (error) {
      console.error('Erro ao criar usuário: ', error.message);
      alert(error.message); // Mostra uma mensagem de erro
  }
});

// Função para login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;

  try {
      const userCredential = await auth.signInWithEmailAndPassword(loginEmail, loginPassword);
      const user = userCredential.user;
      alert('Login realizado com sucesso!');
      // Redirecionar ou fazer algo após o login
  } catch (error) {
      console.error('Erro ao fazer login: ', error.message);
      alert(error.message); // Mostra uma mensagem de erro
  }
});