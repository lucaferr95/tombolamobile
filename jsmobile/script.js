let numeriEstratti = [];
let numeriEstrattiCount = 0;

// Funzione per creare una cartella della tombola
const createCartella = () => {
  const cartellaContainer = document.getElementById("cartelleContainer");

  // Creiamo una cartella con 5 numeri unici
  const cartella = document.createElement("div");
  cartella.classList.add("cartella");

  let numeriCartella = [];
  while (numeriCartella.length < 5) {
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

    // Impostiamo l'immagine di sfondo direttamente alla cella
    const imageUrl = "assetsmobile/pizzaslice.png"; // Sostituisci con il percorso dell'immagine
    cella.style.backgroundImage = `url(${imageUrl})`;
    cella.textContent = numero;
    cella.setAttribute("data-number", numero);

    cartella.appendChild(cella);
  });

  cartellaContainer.appendChild(cartella);
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
    `.cellaCartella[data-number='${numeroCasuale}']`
  );
  if (cellaTombola) {
    const xMark = document.createElement("div");
    xMark.classList.add("xMark");
    xMark.textContent = "X";
    cellaTombola.appendChild(xMark);
  }
};

// Funzione che inizializza il gioco
const startGame = () => {
  // Crea 3 cartelle per il gioco
  for (let i = 0; i < 1; i++) {
    createCartella();
  }

  // Aggiungi il comportamento al pulsante di estrazione
  const estrazioneButton = document.getElementById("randomNumbers");
  estrazioneButton.addEventListener("click", randomNumbers);
};

// Inizializza il gioco quando il documento è pronto
document.addEventListener("DOMContentLoaded", startGame);
