// Obtén el elemento de video y los botones de reproducción y silencio
const videoElement = document.getElementById("medio");
const playButton = document.getElementById("reproducir");
const muteButton = document.getElementById("silenciar");
const volumeSlider = document.getElementById("volumen");
const tiempoActual = document.getElementById("tiempoAct");
const barraProgreso = document.getElementById("progreso");

// Agrega un evento de clic al botón de reproducción
playButton.addEventListener("click", () => {
  if (!videoElement.paused && !videoElement.ended) {
    videoElement.pause();
    playButton.textContent = ">";
    clearInterval(bucle);
  } else {
    videoElement.play();
    playButton.textContent = "||";
    bucle = setInterval(estado, 1000);
  }
});

// Agrega un evento de clic al botón de silencio
muteButton.addEventListener("click", () => {
  videoElement.muted = !videoElement.muted; // Alterna entre silencio y sonido
  if (videoElement.muted) {
    muteButton.textContent = "Desenmudecer";
  } else {
    muteButton.textContent = "Silenciar";
  }
});

// Agrega un evento al control deslizante de volumen
volumeSlider.addEventListener("input", () => {
  videoElement.volume = volumeSlider.value; // Establece el volumen según el valor del control
});

// Agrega un evento de tiempo actualizado al video
videoElement.addEventListener("timeupdate", () => {
  const tiempoActualSegundos = Math.floor(videoElement.currentTime);
  tiempoActual.textContent = tiempoActualSegundos.toFixed(0); // Muestra el tiempo actual

  const porcentajeProgreso =
    (videoElement.currentTime / videoElement.duration) * 100;
  barraProgreso.style.width = `${porcentajeProgreso}%`; // Actualiza la barra de progreso
});

class Logo {
  constructor(color, posX, posY) {
      this.color = color;
      this.posX = posX;
      this.posY = posY;
  }

  // Método para dibujar el logo en el canvas
  draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.posX, this.posY, 25, 25); // Por ejemplo, un rectángulo de 50x50
  }
}

// Obtén el contexto del canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const borrar = document.getElementById('borrar')

// Posición inicial del objeto que seguirá al ratón
let objetoX = canvas.width / 2;
let objetoY = canvas.height / 2;

let color = "blue"

// Agrega un evento para seguir al ratón
canvas.addEventListener("mousemove", (event) => {
  objetoX = event.clientX - canvas.getBoundingClientRect().left;
  objetoY = event.clientY - canvas.getBoundingClientRect().top;
});

// Función para dibujar el objeto
function dibujarObjeto() {
  const logo = new Logo(color,objetoX - 10, objetoY - 10)
  logo.draw(ctx)
  
} 

// Función para animar
function animar() {
  dibujarObjeto();
  requestAnimationFrame(animar);
}



borrar.addEventListener('click', () =>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})

function cambiaColor(){
  const botonescolor = document.querySelectorAll('.botoncolor')

  botonescolor.forEach(element => {
    element.addEventListener('click', () => {
        color = element.value;
        animar();
    });
  });
}

animar();

cambiaColor()

// Inicia la animación

function generarLetra(){
	var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	var numero = (Math.random()*15).toFixed(0);
	return letras[numero];
}
	
function colorHEX(){
	var coolor = "";
	for(var i=0;i<6;i++){
		coolor = coolor + generarLetra() ;
	}
	return "#" + coolor;
}

coloraleatorio = document.getElementById('coloraleatorio')

coloraleatorio.addEventListener('click',()=>{
  if(!videoElement.paused)  {
    color = colorHEX()
    animar()
  }
})



