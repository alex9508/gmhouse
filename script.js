// Lista de imágenes (enlaces externos) y sus correspondientes audios (locales en la carpeta audios en formato .mp3)
const images = [
    { img: "https://acortar.link/hTdyDE", audio: "audios/kitchen.mp3" }, // Kitchen
    { img: "https://acortar.link/jmAnNl", audio: "audios/bathroom.mp3" }, // Bathroom
    { img: "https://acortar.link/AazYJH", audio: "audios/livingroom.mp3" }, // Livingroom
    { img: "https://acortar.link/cUMFRK", audio: "audios/Beedroom.mp3" }, // Bedroom
    { img: "https://acortar.link/PqBhLE", audio: "audios/dn.mp3" }, // Diningroom
];

// Lista de imágenes disponibles para el juego actual
let availableImages = [...images];

// Contadores de aciertos, errores y preguntas
let correctCount = 0;
let incorrectCount = 0;
let questionCount = 0;
const totalQuestions = 5; // Número de preguntas antes de mostrar el popup

// Función para mezclar las imágenes de manera aleatoria
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Selección de imágenes aleatorias
function loadRandomImages() {
    if (availableImages.length < 3) {
        // Reiniciar la lista de imágenes disponibles si hay menos de 3 imágenes
        availableImages = [...images];
    }

    const shuffledImages = shuffleArray(availableImages);
    
    // Seleccionar una imagen correcta y dos incorrectas
    const correctImage = shuffledImages[0];
    const incorrectImages = shuffleArray(shuffledImages.slice(1)).slice(0, 2);
    
    // Mezclar la correcta con las incorrectas
    const imagesToShow = shuffleArray([correctImage, ...incorrectImages]);
    
    // Eliminar las imágenes seleccionadas de la lista de disponibles
    availableImages = availableImages.filter(img => !imagesToShow.includes(img));
    
    // Insertar las imágenes en el HTML
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Limpiar contenido previo
    imagesToShow.forEach((img, index) => {
        const imageElement = document.createElement('img');
        imageElement.src = img.img;
        imageElement.classList.add('game-image');
        imageElement.onclick = () => checkAnswer(img, correctImage);
        imageContainer.appendChild(imageElement);
    });

    // Reproducir el audio de la imagen correcta
    const audioElement = new Audio(correctImage.audio);
    audioElement.play().catch(error => {
        console.error("Error al reproducir el audio:", error);
    });
}

// Función para verificar la respuesta
function checkAnswer(selectedImage, correctImage) {
    if (selectedImage === correctImage) {
        correctCount++;
        alert('Correcto!');
    } else {
        incorrectCount++;
        alert('Incorrecto!');
    }
    questionCount++;
    if (questionCount >= totalQuestions) {
        // Mostrar popup o realizar alguna acción cuando se alcancen las preguntas totales
        alert(`Juego terminado! Aciertos: ${correctCount}, Errores: ${incorrectCount}`);
        // Reiniciar contadores
        correctCount = 0;
        incorrectCount = 0;
        questionCount = 0;
    }
    loadRandomImages(); // Cargar nuevas imágenes para la siguiente pregunta
}

// Inicializar el juego cargando las primeras imágenes
loadRandomImages();