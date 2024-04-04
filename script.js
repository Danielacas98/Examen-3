let randomNumber = Math.floor(Math.random() * 100) + 1; //Genera un numero aleatorio entre 1 y 100 y lo asigna a una variable
const guesses = document.querySelector(".guesses"); // Obtiene el elemento HTML con la clase "guesses" y lo asigna a la variable
const lastResult = document.querySelector(".lastResult"); // Se asigna el elemento a la variable last result
const lowOrHi = document.querySelector(".lowOrHi"); // obtiene el elemento con la clase low or hi y lo asigna a la variable
const guessSubmit = document.querySelector(".guessSubmit"); // obtiene el elemento guess submit y lo asigna a la variable 
const guessField = document.querySelector(".guessField"); // obtiene el elemento guess fiel y lo asigna a la variable 
let guessCount = 1; // inicializa la variable contadora en 1
let resetButton; // se utiliza para el boton de reinicio 

function checkGuess() { // funcion que se ejecuta cuando el usuario hace clic en submit guess
  let userGuess = Number(guessField.value); // obtiene el valor ingresado por el usuario y lo convierte a numero
  if (guessCount === 1) { 
    guesses.textContent = "Intentos anteriores: ";
  } // si es el primer intento agrega el texto intentos anteriores a la lista de intentos

  guesses.textContent += userGuess + " "; // agrega el numero ingresado por el usuario a la lista de intentos

  if (userGuess === randomNumber) { // comprueba si el numero ingresado es igual al aleatorio 
    lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!"; //si el usuario adivino, muestra este mensaje
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver(); // funcion para finalizar juego
  } else if (guessCount === 10) { //si el usuario agoto los 10 intentos muestra el mensaje fin de juego
    lastResult.textContent = "!!!Fin del juego!!!";
    lowOrHi.textContent = "";
    setGameOver(); // funcion para finalizar juego
  } else { // si el usuario no adivino, muestra mensaje de mensaje incorrecto, y da las pistas
    lastResult.textContent = "Incorrecto!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "El numero es muy bajo!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "El numero es muy grande!";
    }
  }

  guessCount++; // incrementa el contador de intentos
  guessField.value = ""; // borra el valor ingresado en el campo de texto
}

guessSubmit.addEventListener("click", checkGuess); // agrega evento de clic al boton submit guess

function setGameOver() { // funcion que se ejecuta cuando se finaliza juego
  guessField.disabled = true; // deshabilita el campo de texto para evitar mas intentos
  guessSubmit.disabled = true; //deshabilita el boton de envio para evitar mas intentos
  resetButton = document.createElement("button"); // crea nuevo boton de reinicio
  resetButton.textContent = "Iniciar nuevo juego"; //asigna el texto al boton de reinicio
  document.body.append(resetButton); //arega el boton de reinicio al cuerpo del documento
  resetButton.addEventListener("click", resetGame); //agrega un evento de clic al boton de reinicio
}

function resetGame() { // funcion para reiniciar juego
  guessCount = 1; // reinicia el contador de intentos a 1
  const resetParas = document.querySelectorAll(".resultParas p"); // borra el contenido de elementos html relacionados con resultados del juego
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton); // elimina el boton de reinicio del documento
  guessField.disabled = false; // habilita nuevamente el campo de texto
  guessSubmit.disabled = false; // habilita nuevamente el boton de envio
  guessField.value = ""; //borra el valor ingresado
  guessField.focus(); //para que el usuario pueda ingresar otro numero rapidamente
  lastResult.style.backgroundColor = "white"; //restaura el color de fondo a blanco
  randomNumber = Math.floor(Math.random() * 100) + 1; // genera un nuevo numero aleatorio para el siguiente juego
}
