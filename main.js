// This file contains the JavaScript code for the web page. It handles interactivity and dynamic content on the page.

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('respuesta');
    const imagenes = document.querySelectorAll('ul.image-list img');
    const tiempoSpan = document.getElementById('tiempo-restante');
    const btnConfigurar = document.getElementById('configurar-tiempo');
    const btnResetear = document.getElementById('resetear-animatronicos');

    const respuestas = [
        'freddy', 'bonnie', 'chica', 'foxy','golden freddy','cupcake','endo 01',
        'toy freddy','toy bonnie','toy chica','mangle','ballon boy','jj','puppet',
        'withered freddy','withered bonnie','withered chica','withered foxy',
        'withered golden freddy','shadow bonnie','shadow freddy','endo 02',
        'springtrap','phantom freddy','phantom chica','phantom foxy','phantom mangle',
        'phantom puppet','phantom ballon boy'
    ];

    let timerStarted = false;
    let timerId = null;
    let tiempoRestante = 300; // 5 minutos por defecto
    let tiempoInicial = 300;

    function mostrarTiempo() {
        const min = String(Math.floor(tiempoRestante / 60)).padStart(2, '0');
        const seg = String(tiempoRestante % 60).padStart(2, '0');
        tiempoSpan.textContent = `${min}:${seg}`;
    }
    mostrarTiempo();

    function resetAnimatronicos() {
        imagenes.forEach(img => {
            img.classList.remove('iluminar');
            img.classList.add('oscura');
        });
        input.disabled = false;
        input.value = '';
        timerStarted = false;
        clearInterval(timerId);
        tiempoRestante = tiempoInicial;
        mostrarTiempo();
    }

    imagenes.forEach(img => img.classList.add('oscura'));

    function mostrarGameOver() {
        const descubiertos = document.querySelectorAll('.iluminar').length;
        alert(`GAME OVER\nAnimatrónicos descubiertos: ${descubiertos}`);
        input.disabled = true;
    }

    function iniciarContador() {
        timerId = setInterval(() => {
            tiempoRestante--;
            mostrarTiempo();
            if (tiempoRestante <= 0) {
                clearInterval(timerId);
                mostrarGameOver();
            }
        }, 1000);
    }

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            if (!timerStarted) {
                timerStarted = true;
                iniciarContador();
            }
            const valor = input.value.trim().toLowerCase();

            imagenes.forEach((img, idx) => {
                if (valor === respuestas[idx]) {
                    img.classList.add('iluminar');
                    img.classList.remove('oscura');
                }
            });

            input.value = '';
        }
    });

    btnConfigurar.addEventListener('click', function() {
        let minutos = prompt('¿Cuántos minutos quieres para el temporizador?', Math.floor(tiempoInicial / 60));
        if (minutos !== null) {
            minutos = parseInt(minutos);
            if (!isNaN(minutos) && minutos > 0) {
                tiempoInicial = minutos * 60;
                tiempoRestante = tiempoInicial;
                mostrarTiempo();
                clearInterval(timerId);
                timerStarted = false;
                input.disabled = false;
            } else {
                alert('Por favor, ingresa un número válido mayor que 0.');
            }
        }
    });

    btnResetear.addEventListener('click', resetAnimatronicos);
});