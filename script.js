document.addEventListener('DOMContentLoaded', () => {
    const wordsFile = 'words.txt'; // Ruta al archivo words.txt
    let allWords = [];

    // Elementos del DOM
    const modeSelectionScreen = document.getElementById('mode-selection');
    const wordsModeScreen = document.getElementById('words-mode');
    const codeGeneratorModeScreen = document.getElementById('code-generator-mode');

    const wordsModeBtn = document.getElementById('words-mode-btn');
    const codeGeneratorModeBtn = document.getElementById('code-generator-mode-btn');
    const endGameBtns = document.querySelectorAll('.end-game-btn');

    const miscommunicationCountSpan = document.getElementById('miscommunication-count');
    const interceptionCountSpan = document.getElementById('interception-count');
    const incrementBtns = document.querySelectorAll('.increment-btn');
    const decrementBtns = document.querySelectorAll('.decrement-btn');
    const generateNewWordsBtn = document.getElementById('generate-new-words-btn');
    const wordCardsContainer = document.getElementById('word-cards-container');
    const teamSwitchBtn = document.getElementById('team-switch-btn');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const timerDisplay = document.getElementById('timer-display');

    const generatedCodeSpan = document.getElementById('generated-code');
    const generateNewCodeBtn = document.getElementById('generate-new-code-btn');
    const codeCard = document.querySelector('.code-card');

    let miscommunicationCount = 0;
    let interceptionCount = 0;
    let timerInterval = null;
    let countdown = 30;
    let timerSound = null; // Variable para guardar la referencia al sonido del timer

    // --- Funciones de Utilidad ---
    const container = document.querySelector('.container');

    function playSound(src) {
        const sound = new Audio(src);
        sound.play();
    }

    function showScreen(screenToShow) {
        const screens = [modeSelectionScreen, wordsModeScreen, codeGeneratorModeScreen];

        screens.forEach(screen => {
            if (screen === screenToShow) {
                screen.classList.remove('hidden');
                screen.classList.add('active');
            } else {
                screen.classList.add('hidden');
                screen.classList.remove('active');
            }
        });
    }

    async function loadWords() {
        try {
            const response = await fetch(wordsFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            allWords = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
            console.log(`Loaded ${allWords.length} words.`);
        } catch (error) {
            console.error('Error loading words.txt:', error);
            alert('No se pudieron cargar las palabras. Asegúrate de que "words.txt" esté en la misma carpeta.');
        }
    }

    function getRandomWords(num) {
        if (allWords.length === 0) {
            console.warn("No words loaded.");
            return [];
        }
        const shuffled = [...allWords].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function generateRandomCode() {
        const numbers = [1, 2, 3, 4];
        // Mezclar el array y tomar los primeros 3 elementos
        const shuffled = numbers.sort(() => 0.5 - Math.random());
        const codeArray = shuffled.slice(0, 3);
        return codeArray.join('.');
    }

    function updateCounter(counterType, delta) {
        if (counterType === 'miscommunication') {
            miscommunicationCount = Math.max(0, Math.min(2, miscommunicationCount + delta));
            miscommunicationCountSpan.textContent = miscommunicationCount;
        } else if (counterType === 'interception') {
            interceptionCount = Math.max(0, Math.min(2, interceptionCount + delta));
            interceptionCountSpan.textContent = interceptionCount;
        }
    }

    function resetCounters() {
        miscommunicationCount = 0;
        interceptionCount = 0;
        miscommunicationCountSpan.textContent = miscommunicationCount;
        interceptionCountSpan.textContent = interceptionCount;
    }

    // --- Lógica de Modos ---

    function setupWordsMode() {
        const selectedWords = getRandomWords(4);
        wordCardsContainer.innerHTML = ''; // Limpiar tarjetas anteriores
        selectedWords.forEach((word, index) => {
            // Crear un contenedor para la tarjeta y su número
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('card-wrapper');

            // Crear la tarjeta de la palabra
            const card = document.createElement('div');
            card.classList.add('word-card');
            const p = document.createElement('p');
            p.textContent = word;
            card.appendChild(p);

            // Crear el número debajo de la tarjeta
            const number = document.createElement('span');
            number.classList.add('card-number');
            number.textContent = index + 1;

            // Añadir la tarjeta y el número a su contenedor
            cardWrapper.appendChild(card);
            cardWrapper.appendChild(number);
            wordCardsContainer.appendChild(cardWrapper);
        });
        resetCounters();
    }

    function toggleTimer() {
        if (timerInterval) { // Si el temporizador está corriendo, lo detenemos y reiniciamos.
            clearInterval(timerInterval);
            timerInterval = null;

            if (timerSound) { // Detener el sonido del reloj si está sonando
                timerSound.pause();
                timerSound.currentTime = 0; // Reiniciar el audio al principio
            }

            countdown = 30;
            timerDisplay.textContent = countdown;
            startTimerBtn.textContent = 'Timer';
            startTimerBtn.disabled = false;
        } else { // Si el temporizador está detenido, lo iniciamos.
            timerSound = new Audio('sounds/clock-tick.mp3');
            timerSound.loop = true; // Hacer que el sonido se repita
            timerSound.play(); // Sonido de inicio del timer

            countdown = 30;
            timerDisplay.textContent = countdown;
            startTimerBtn.textContent = 'Parar'; // Cambiar texto del botón

            timerInterval = setInterval(() => {
                countdown--;
                timerDisplay.textContent = countdown;

                if (countdown <= 0) {
                    playSound('sounds/boxing-bell.mp3'); // Sonido de fin del timer
                    toggleTimer(); // Llamar a la misma función para detener y reiniciar
                }
            }, 1000);
        }
    }

    function setupCodeGeneratorMode() {
        const newCode = generateRandomCode();
        codeCard.dataset.code = newCode; // Guardar el código en un atributo de datos
        generatedCodeSpan.textContent = '?'; // Mostrar el marcador de posición
    }

    // --- Event Listeners ---

    // Sonido de clic para todos los botones
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            playSound('sounds/click.wav');
        });
    });

    wordsModeBtn.addEventListener('click', () => {
        showScreen(wordsModeScreen);
        setupWordsMode();
    });

    codeGeneratorModeBtn.addEventListener('click', () => {
        showScreen(codeGeneratorModeScreen);
        setupCodeGeneratorMode();
    });

    teamSwitchBtn.addEventListener('click', () => {
        container.classList.toggle('team-white-theme');
        if (container.classList.contains('team-white-theme')) {
            teamSwitchBtn.textContent = 'Equipo: Blanco';
        } else {
            teamSwitchBtn.textContent = 'Equipo: Negro';
        }
    });

    // --- Lógica para revelar/ocultar código ---
    const revealCode = () => {
        if (codeCard.dataset.code) {
            generatedCodeSpan.textContent = codeCard.dataset.code;
        }
    };

    const hideCode = () => {
        if (codeCard.dataset.code) {
            generatedCodeSpan.textContent = '?';
        }
    };

    // Eventos de ratón
    codeCard.addEventListener('mousedown', revealCode);
    codeCard.addEventListener('mouseup', hideCode);
    codeCard.addEventListener('mouseleave', hideCode); // Ocultar si el ratón sale de la tarjeta
    // Eventos táctiles para móviles
    codeCard.addEventListener('touchstart', (e) => { e.preventDefault(); revealCode(); });
    codeCard.addEventListener('touchend', hideCode);

    endGameBtns.forEach(button => {
        button.addEventListener('click', () => showScreen(modeSelectionScreen));
    });

    incrementBtns.forEach(btn => {
        btn.addEventListener('click', () => updateCounter(btn.dataset.counter, 1));
    });

    decrementBtns.forEach(btn => {
        btn.addEventListener('click', () => updateCounter(btn.dataset.counter, -1));
    });

    generateNewWordsBtn.addEventListener('click', setupWordsMode);
    startTimerBtn.addEventListener('click', toggleTimer);
    generateNewCodeBtn.addEventListener('click', setupCodeGeneratorMode);

    // Cargar palabras al iniciar la aplicación
    loadWords();
});