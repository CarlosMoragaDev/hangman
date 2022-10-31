//constante para los contenedores
const palabraE1 = document.getElementById('word');
const palabraErroneaE1 = document.getElementById('wrong-letters');
const btnVolverJugar = document.getElementById('play-button');
const vEmergente = document.getElementById('popup-container');
const notificacion = document.getElementById('notification-container');
const mensajeFinal = document.getElementById('final-message');
const mensajeFinalPalabraRevelada = document.getElementById('final-message-reveal-word');
//para imagen de evolucion
const imagenCorrecta = document.querySelectorAll('.lista-imagenes');

//constante para aparezca el cuerpo en caso de error
const partesCuerpo = document.querySelectorAll('.figure-part')

//array de palabras para adivinar
const palabras = ['vaporeon', 'flareon', 'jolteon', 'umbreon', 'espeon', 'glaceon', 'leafeon', 'sylveon' ]


//metodo escoge una palabra del array al azar
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

//habilita la opcion de juego de cumplir condicion
let playable = true;

//array de palabras ingresadas
const letrasCorrectas = [];
const letrasErroneas = [];


//funcion que muestra la palabra escondida
function mostrarPalabra(){
    palabraE1.innerHTML = `
    ${palabraSeleccionada
                .split('')
                .map(
                    letter => `
                <span class="letter">
                    ${letrasCorrectas.includes(letter) ? letter : ''}
                </span>    
            `
                )
                .join('')}
    `;

    const innerWord = palabraE1.innerText.replace(/[ \n]/g, '');

    if (innerWord === palabraSeleccionada){
        mensajeFinal.innerText = 'Felicidades adivinaste la evolucion!';
        mensajeFinalPalabraRevelada.innerText = '';
        vEmergente.style.display = 'flex';
        imagenes.style.display = 'flex';

        playable = false;
    }
}

//Funcion para actualizar las letras erroneas
function actualizarPalabraErroneaE1(){
    //mostrar letras erroneas
    palabraErroneaE1.innerHTML = `
    ${letrasErroneas.length > 0 ? '<p>Error</p>' : ''}
    ${letrasErroneas.map(letter => `<span>${letter}</span>`)}
    `;

    //mostrar partes
    partesCuerpo.forEach((part, index)=> {
        //almecenara los errores ingresados
        const errores = letrasErroneas.length;

        if (index < errores){
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //revisar si perdiste
    if (letrasErroneas.length === partesCuerpo.length) {
        mensajeFinal.innerText = 'Lo siento, perdiste.';
        mensajeFinalPalabraRevelada.innerText = `... la evolucion era: ${palabraSeleccionada}`;
        vEmergente.style.display = 'flex';

        playable = false;
    }
}

//funcion de mostrar notificacion
function mostrarNotificacion(){
    notificacion.classList.add('show');

    setTimeout(() => {
        notificacion.classList.remove('show');
    }, 2000);
}

//Permite ingreso de letras por teclado
window.addEventListener('keydown', e => {
    if(playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90){
            //letra ingresada sera en minuscula    
            const letter = e.key.toLowerCase();

            if (palabraSeleccionada.includes(letter)){
                if(!letrasCorrectas.includes(letter)){
                    letrasCorrectas.push(letter);

                    mostrarPalabra();
                }else {
                    mostrarNotificacion();
                }
            }else {
                if (!letrasErroneas.includes(letter)){
                    letrasErroneas.push(letter);

                    actualizarPalabraErroneaE1();
                }else{
                    mostrarNotificacion();
                }
            }
        }
    }
});

//reiniciar juego y volver a jugar
btnVolverJugar.addEventListener('click', () => {
    playable = true;

    //array vacio
    letrasCorrectas.splice(0);
    letrasErroneas.splice(0);

    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

    mostrarPalabra();

    actualizarPalabraErroneaE1();

    vEmergente.style.display = 'none';
});


mostrarPalabra();


