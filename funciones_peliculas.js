const preguntas = [
  {
    pregunta: "¿Quién dirigió la película 'Titanic'?",
    opciones: ["Steven Spielberg", "James Cameron", "Martin Scorsese", "Christopher Nolan"],
    respuesta: "James Cameron"
  },
  {
    pregunta: "¿Qué película ganó el Oscar a Mejor Película en 1994?",
    opciones: ["Pulp Fiction", "Forrest Gump", "The Shawshank Redemption", "El Rey León"],
    respuesta: "Forrest Gump"
  },
  {
    pregunta: "¿Quién interpreta a Jack Sparrow en 'Piratas del Caribe'?",
    opciones: ["Orlando Bloom", "Johnny Depp", "Brad Pitt", "Tom Cruise"],
    respuesta: "Johnny Depp"
  },
  {
    pregunta: "¿En qué saga aparece el personaje 'Gollum'?",
    opciones: ["Harry Potter", "Star Wars", "El Señor de los Anillos", "Narnia"],
    respuesta: "El Señor de los Anillos"
  },
  {
    pregunta: "¿Cuál es la película animada más taquillera de todos los tiempos (hasta 2024)?",
    opciones: ["Toy Story", "Frozen II", "Minions", "Shrek 2"],
    respuesta: "Frozen II"
  },
  {
    pregunta: "¿Qué actor interpreta a Batman en 'The Dark Knight'?",
    opciones: ["Ben Affleck", "Christian Bale", "Michael Keaton", "Robert Pattinson"],
    respuesta: "Christian Bale"
  },
  {
    pregunta: "¿Cómo se llama la nave espacial en 'Star Wars' pilotada por Han Solo?",
    opciones: ["X-Wing", "Enterprise", "Halcón Milenario", "Nostromo"],
    respuesta: "Halcón Milenario"
  },
  {
    pregunta: "¿Qué película contiene la frase: 'Hasta la vista, baby'?",
    opciones: ["Terminator 2", "Rambo", "Matrix", "Robocop"],
    respuesta: "Terminator 2"
  },
  {
    pregunta: "¿Qué director es famoso por películas como 'El origen' y 'Interestelar'?",
    opciones: ["Quentin Tarantino", "Christopher Nolan", "Ridley Scott", "James Cameron"],
    respuesta: "Christopher Nolan"
  },
  {
    pregunta: "¿Cuál de estas películas es un musical?",
    opciones: ["Gladiator", "La La Land", "Inception", "Avatar"],
    respuesta: "La La Land"
  }
];

let calificaciones = [];

document.addEventListener("DOMContentLoaded", () => {
  const questionsContainer = document.getElementById("questions");

  preguntas.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p><b>${index + 1}. ${q.pregunta}</b></p>` +
      q.opciones.map(opt =>
        `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`
      ).join("");
    questionsContainer.appendChild(div);
  });
});

function calificar() {
  let score = 0;
  calificaciones = [];

  preguntas.forEach((q, i) => {
    const seleccion = document.querySelector(`input[name="q${i}"]:checked`);
    if (seleccion && seleccion.value === q.respuesta) {
      score++;
      calificaciones.push(1);
    } else {
      calificaciones.push(0);
    }
  });

  document.getElementById("score").textContent = `Obtuviste ${score} de 10 puntos.`;
  generarGrafico();
}

function generarGrafico() {
  const ctx = document.getElementById('resultChart').getContext('2d');
  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: preguntas.map((_, i) => `P${i + 1}`),
      datasets: [{
        label: 'Puntaje por pregunta',
        data: calificaciones,
        backgroundColor: calificaciones.map(p => p === 1 ? 'gold' : '#555')
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 1 }
      }
    }
  });
}

function descargar() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Resultado del diagnóstico - Cine", 10, 10);
  let y = 20;

  preguntas.forEach((q, i) => {
    doc.setFontSize(10);
    doc.text(`${i + 1}. ${q.pregunta}`, 10, y);
    doc.text(`Puntaje: ${calificaciones[i]}`, 180, y);
    y += 6;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.setFontSize(14);
  doc.text(`Puntaje Total: ${calificaciones.reduce((a, b) => a + b)} / 10`, 10, y + 10);
  doc.save("resultado_diagnostico_Cine.pdf");
}
