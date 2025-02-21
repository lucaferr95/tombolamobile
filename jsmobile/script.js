// Array per tenere traccia dei numeri estratti
let numeriEstratti = [];
let numeriEstrattiCount = 0;
let numeriCartella = []; // Variabile per memorizzare i numeri della cartella

// Funzione per creare la cartella della tombola (solo una cartella)
const createCartella = () => {
  const cartellaContainer = document.getElementById("cartelleContainer");

  // Creiamo una cartella con 3 numeri
  const cartella = document.createElement("div");
  cartella.classList.add("cartella");

  numeriCartella = []; // Reset della cartella

  while (numeriCartella.length < 3) {
    const numeroCasuale = Math.floor(Math.random() * 90) + 1;
    if (!numeriCartella.includes(numeroCasuale)) {
      numeriCartella.push(numeroCasuale);
    }
  }

  // Ordiniamo i numeri in modo crescente
  numeriCartella.sort((a, b) => a - b);

  // Creiamo le celle per i numeri della cartella
  numeriCartella.forEach((numero) => {
    const cella = document.createElement("div");
    cella.classList.add("cellaCartella");
    cella.textContent = numero;
    cella.setAttribute("data-number", numero); // Aggiungi l'attributo per fare riferimento al numero

    // Impostiamo l'immagine di sfondo alla cella
    const imageUrl = "assetsmobile/pizzaslice.png"; // Sostituisci con il percorso dell'immagine
    cella.style.backgroundImage = `url(${imageUrl})`;

    cartella.appendChild(cella);
  });

  cartellaContainer.appendChild(cartella);
};

// Funzione per creare la griglia dei numeri (da 1 a 90)
const createNumeriGriglia = () => {
  const tombolaContainer = document.getElementById("tombolaContainer");

  // Aggiungiamo i numeri da 1 a 90 alla griglia
  for (let i = 1; i <= 90; i++) {
    const cella = document.createElement("div");
    cella.classList.add("cellClass");
    cella.textContent = i;
    cella.setAttribute("data-number", i); // Aggiungi l'attributo per fare riferimento al numero

    // Impostiamo l'immagine di sfondo
    const imageUrl = "assetsmobile/pizzaslice.png"; // Sostituisci con il percorso dell'immagine
    cella.style.backgroundImage = `url(${imageUrl})`;

    tombolaContainer.appendChild(cella);
  }
};

// Funzione che gestisce l'estrazione dei numeri
const randomNumbers = () => {
  const numeriEstrattiList = document.getElementById("numeriList");

  if (numeriEstrattiCount >= 20) {
    alert("Il gioco è terminato! Sono stati estratti 20 numeri.");
    return;
  }

  // Trova un numero casuale che non è già stato estratto
  let numeroCasuale;
  do {
    numeroCasuale = Math.floor(Math.random() * 90) + 1;
  } while (numeriEstratti.includes(numeroCasuale));

  // Aggiungi il numero estratto all'array
  numeriEstratti.push(numeroCasuale);
  numeriEstrattiCount++;

  // Aggiungi il numero estratto alla lista visibile sotto "Ecco i numeri estratti"
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = numeroCasuale;
  li.appendChild(span);

  // Applica l'immagine di sfondo ai numeri estratti
  const imageUrl = "assetsmobile/pizzaslice.png"; // Sostituisci con il percorso dell'immagine
  li.style.backgroundImage = `url(${imageUrl})`;

  numeriEstrattiList.appendChild(li);

  // Aggiungi la X sopra la cella della tombola corrispondente
  const cellaTombola = document.querySelector(
    `.cellClass[data-number='${numeroCasuale}']`
  );
  const xMark = document.createElement("div");
  xMark.classList.add("xMark");
  xMark.textContent = "X";
  if (cellaTombola) {
    cellaTombola.appendChild(xMark);
  }

  // Aggiungi la classe 'dot' alla cella della cartella corrispondente
  const cellaCartella = document.querySelector(
    `.cellaCartella[data-number='${numeroCasuale}']`
  );

  if (cellaCartella) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    cellaCartella.appendChild(dot);
  }

  // Controlla se la cartella è completa
  checkVictory();
};

// Funzione che controlla se la cartella è completa
const checkVictory = () => {
  const completedNumbers = numeriCartella.filter((numero) =>
    numeriEstratti.includes(numero)
  );

  if (completedNumbers.length === numeriCartella.length) {
    showVictoryMessage();
  }
};

// Funzione che mostra un messaggio di vittoria con una pizza casuale
const showVictoryMessage = () => {
  const victoryMessage = document.getElementById("victoryMessage");

  // Scegli una pizza casuale
  const randomPizza =
    pizzaImages[Math.floor(Math.random() * pizzaImages.length)];

  // Crea un'immagine della pizza
  const pizzaImage = document.createElement("img");
  pizzaImage.src = randomPizza;
  pizzaImage.alt = "Pizza di vittoria";
  pizzaImage.style.width = "200px"; // Puoi personalizzare la larghezza
  pizzaImage.style.height = "200px"; // Puoi personalizzare l'altezza

  // Aggiungi l'immagine della pizza al messaggio di vittoria
  victoryMessage.innerHTML =
    "<h1>Complimenti, sei il Re di tutti i Re! (o la Regina di tutti i regni...'nsomma, ci siamo capiti)</h1>";
  victoryMessage.appendChild(pizzaImage);

  // Mostra il messaggio di vittoria
  victoryMessage.style.display = "block"; // Rendi visibile il messaggio
};

// Funzione che inizializza il gioco
const startGame = () => {
  // Crea la griglia dei numeri (1-90)
  createNumeriGriglia();

  // Crea la cartella (una sola cartella)
  createCartella();

  // Aggiungi il comportamento al pulsante di estrazione
  const estrazioneButton = document.getElementById("randomNumbers");
  estrazioneButton.addEventListener("click", randomNumbers);
};

// Array di immagini di pizza
const pizzaImages = [
  "assetsmobile/pizza1.jpg", // Cambia con i percorsi delle immagini che vuoi usare
  "assetsmobile/pizza2.jpg",
  "assetsmobile/pizza3.jpg",
  "assetsmobile/pizza4.png",
];

// Inizializza il gioco quando il documento è pronto
document.addEventListener("DOMContentLoaded", startGame);
