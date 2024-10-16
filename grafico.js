import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Carregar o Chart.js como um script externo
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/chart.js";
document.head.appendChild(script);

script.onload = async () => {
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

    const avaliacaoId = "Auovwu2JaJOR3jEscsfa"; // ID do documento para a avaliação

    // Função para obter as avaliações do Firestore
    async function getAvaliacoes() {
        const notaRef = doc(db, 'avaliacoes', avaliacaoId);
        const docSnap = await getDoc(notaRef);
        
        if (docSnap.exists()) {
            const dados = docSnap.data();
            const notas = [
                dados.excelente || 0,
                dados.bom || 0,
                dados.razoavel || 0,
                dados.ruim || 0,
                dados.pessimo || 0
            ];
            createChart(notas);
        } else {
            console.log("Nenhum dado encontrado!");
        }
    }

    // Função para criar o gráfico de barras
    function createChart(notas) {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Excelente', 'Bom', 'Razoável', 'Ruim', 'Péssimo'],
                datasets: [{
                    label: '# de Avaliações',
                    data: notas,
                    backgroundColor: [
                        '#4caf50', // Excelente
                        '#2196f3', // Bom
                        '#ffeb3b', // Razoável
                        '#ff9800', // Ruim
                        '#f44336'  // Péssimo
                    ],
                    borderColor: [
                        '#4caf50', // Excelente
                        '#2196f3', // Bom
                        '#ffeb3b', // Razoável
                        '#ff9800', // Ruim
                        '#f44336'  // Péssimo
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // Habilita a responsividade
                maintainAspectRatio: false, // Permite alterar a proporção
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Chama a função para obter as avaliações ao carregar a página
    getAvaliacoes();
};
