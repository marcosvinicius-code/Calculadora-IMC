// Função para calcular e exibir o IMC
document.getElementById("imc-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  if (!weight || !height || weight <= 0 || height <= 0) {
    alert(
      "Por favor, insira valores válidos para peso e altura. Ambos devem ser maiores que zero."
    );
    return;
  }

  // Calculando o IMC
  const imc = weight / (height * height);
  let category = "";
  let recommendations = "";
  let activitySuggestions = "";
  let dietSuggestions = "";

  // Categorias de IMC
  if (imc < 18.5) {
    category = "Abaixo do peso";
    recommendations =
      "É importante que você busque uma alimentação saudável e equilibrada para ganhar peso de maneira saudável.";
    activitySuggestions =
      "Atividades como musculação e treinamento com pesos podem ajudar no ganho de massa muscular.";
    dietSuggestions =
      "Inclua mais proteínas, carboidratos complexos e gorduras saudáveis em sua dieta.";
  } else if (imc >= 18.5 && imc <= 24.9) {
    category = "Peso normal";
    recommendations =
      "Continue mantendo uma alimentação balanceada e praticando atividades físicas regularmente para manter sua saúde.";
    activitySuggestions =
      "Continue com atividades como caminhada, corrida e musculação para manter a forma.";
    dietSuggestions =
      "Mantenha uma alimentação rica em frutas, vegetais, proteínas magras e grãos integrais.";
  } else if (imc >= 25 && imc <= 29.9) {
    category = "Sobrepeso";
    recommendations =
      "Recomenda-se adotar uma dieta balanceada e praticar exercícios físicos regularmente para perder peso de forma saudável.";
    activitySuggestions =
      "Atividades aeróbicas como corrida, natação e ciclismo são ótimas para queimar calorias.";
    dietSuggestions =
      "Evite alimentos processados, diminua o consumo de carboidratos simples e adote porções controladas.";
  } else {
    category = "Obesidade";
    recommendations =
      "É essencial buscar orientação médica para elaborar um plano de dieta e exercícios. A perda de peso gradual é crucial para a saúde.";
    activitySuggestions =
      "Atividades de baixo impacto, como caminhada, natação e yoga, podem ser mais adequadas.";
    dietSuggestions =
      "Consulte um nutricionista para desenvolver um plano alimentar específico para sua necessidade.";
  }

  // Exibir resultados
  document.getElementById("imc-value").textContent = `IMC: ${imc.toFixed(2)}`;
  document.getElementById(
    "imc-category"
  ).textContent = `Categoria: ${category}`;
  document.getElementById("recommendations").textContent = recommendations;

  // Exibir sugestões de atividades e dieta
  document.getElementById(
    "activity-suggestions"
  ).textContent = `Sugestões de atividades: ${activitySuggestions}`;
  document.getElementById(
    "diet-suggestions"
  ).textContent = `Sugestões de dieta: ${dietSuggestions}`;

  // Mostrar a seção de resultados
  document.getElementById("result").style.display = "block";

  // Gerar gráfico do IMC
  generateChart(imc);
});

// Função para gerar o gráfico
function generateChart(imc) {
  const ctx = document.getElementById("imc-chart").getContext("2d");

  const labels = ["Abaixo do peso", "Peso normal", "Sobrepeso", "Obesidade"];
  const data = [18.5, 24.9, 29.9, 40];

  let imcCategoryColor = "#e74c3c"; // Default para obesidade
  if (imc < 18.5) {
    imcCategoryColor = "#3498db"; // Abaixo do peso
  } else if (imc >= 18.5 && imc <= 24.9) {
    imcCategoryColor = "#2ecc71"; // Peso normal
  } else if (imc >= 25 && imc <= 29.9) {
    imcCategoryColor = "#f39c12"; // Sobrepeso
  }

  if (window.imcChart) {
    window.imcChart.destroy(); // Limpar gráfico anterior, se existir
  }

  window.imcChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Índice de Massa Corporal (IMC)",
          data: data,
          backgroundColor: [imcCategoryColor, "#2ecc71", "#f39c12", "#e74c3c"],
          borderColor: ["#2980b9", "#27ae60", "#e67e22", "#c0392b"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Função para alternar o tema
document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "☀️";
  } else {
    this.textContent = "🌙";
  }
});
