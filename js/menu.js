// Creación de una nueva instancia de animación (TimelineMax) que inicia pausada.
tl = new TimelineMax({ paused: true });

// Animación para mostrar el menú izquierdo moviéndolo hacia la posición "left: 0".
tl.to(".menu-left", 1, {
    left: 0,
    ease: Expo.easeInOut,
});

// Animación para mostrar el menú derecho moviéndolo hacia la posición "right: 0".
tl.to(
    ".menu-right",
    1,
    {
        right: 0,
        ease: Expo.easeInOut,
    },
    "-=1" // Retrasa en 1 segundo esta animación respecto a la anterior.
);

// Animación para mostrar los elementos de enlace del menú con efecto de entrada escalonada.
tl.staggerFrom(
    ".menu-links > div",
    0.8,
    {
        y: 100, // Mover desde abajo (translateY) 100 unidades.
        opacity: 0, // Inicialmente invisible.
        ease: Expo.easeOut, // Efecto de entrada suave.
    },
    "0.1", // Espaciado de tiempo entre animaciones sucesivas.
    "-=0.4" // Retraso en 0.4 segundos respecto al inicio.
);

// Animación para mostrar los elementos de información de contacto y redes sociales.
tl.staggerFrom(
    ".mail > div, .socials > div",
    0.8,
    {
        y: 100,
        opacity: 0,
        ease: Expo.easeOut,
    },
    "0.1",
    "-=1" // Retraso en 1 segundo respecto al inicio.
);

// Animación para mostrar el botón de cierre del menú con efecto de escalado.
tl.from(
    ".menu-close",
    1,
    {
        scale: 0, // Escalar desde tamaño 0.
        opacity: 1, // Hacerlo visible.
        ease: Expo.easeInOut,
    },
    "-=1" // Retraso en 1 segundo respecto al inicio.
);

// Animación para desplegar una línea horizontal (hr) con un efecto de escalado vertical.
tl.to(
    ".hr",
    0.4,
    {
        scaleY: 1, // Escalar en el eje Y para crear la línea.
        transformOrigin: "0% 50%", // Punto de origen de la transformación.
        ease: Power2.ease,
    },
    "-=2" // Retraso en 2 segundos respecto al inicio.
);

// Invierte la dirección de la animación para que esté pausada inicialmente.
tl.reverse();

// Detecta clics en el elemento con clase "menu-open" y cambia el estado de la animación.
$(document).on("click", ".menu-open", function () {
    tl.reversed(!tl.reversed());
});

// Detecta clics en el elemento con clase "menu-close" y cambia el estado de la animación.
$(document).on("click", ".menu-close", function () {
    tl.reversed(!tl.reversed());
});

const menuleft = document.querySelector(".menu-left");

if (window.innerWidth < 768) {
  menuleft.style.left = "-450px";
}

