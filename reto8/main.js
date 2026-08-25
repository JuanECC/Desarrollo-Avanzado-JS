import './style.css';

const inputNumero = document.getElementById('numero');
const botonAdivinar = document.getElementById('adivinar');
const botonReiniciar = document.getElementById('reiniciar');
const mensaje = document.getElementById('mensaje');
const mensajeIntentos = document.getElementById('intentos');

let numeroSecreto = generarNuevoNumero();
let intentos = 0;

function generarNuevoNumero() {
  return Math.floor(Math.random() * 100) + 1;
}

function reiniciarJuego() {
  numeroSecreto = generarNuevoNumero();
  intentos = 0;
  mensaje.textContent = '';
  mensajeIntentos.textContent = '';
  inputNumero.value = '';
  inputNumero.disabled = false;
  botonAdivinar.disabled = false;
  botonReiniciar.style.display = 'none';
  inputNumero.focus();
  console.log('Nuevo número secreto:', numeroSecreto);
}

botonAdivinar.addEventListener('click', () => {
  const numeroJugador = parseInt(inputNumero.value);

  if (isNaN(numeroJugador) || numeroJugador < 1 || numeroJugador > 100) {
    mensaje.textContent = '⚠️ Por favor, ingresa un número válido entre 1 y 100.';
    return;
  }

  intentos++;
  mensajeIntentos.textContent = `Intentos: ${intentos}`;

  if (numeroJugador === numeroSecreto) {
    mensaje.textContent = '🎉 ¡Felicidades! ¡Adivinaste el número!';
    mensajeIntentos.textContent += ` - ¡Lo lograste en ${intentos} intento(s)!`;
    inputNumero.disabled = true;
    botonAdivinar.disabled = true;
    botonReiniciar.style.display = 'inline-block';
  } else if (numeroJugador < numeroSecreto) {
    mensaje.textContent = '📈 El número es más alto.';
  } else {
    mensaje.textContent = '📉 El número es más bajo.';
  }
});

botonReiniciar.addEventListener('click', reiniciarJuego);