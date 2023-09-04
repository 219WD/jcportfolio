// Cursor
// Selecciona el elemento que representa el cursor personalizado.
const siteWideCursor = document.querySelector(".custom-cursor.site-wide");

// Cuando el puntero del mouse entra en la página, muestra el cursor personalizado.
document.addEventListener("mouseenter", () => {
    siteWideCursor.style.display = "block";
});

// Cuando el puntero del mouse sale de la página, oculta el cursor personalizado.
document.addEventListener("mouseleave", () => {
    siteWideCursor.style.display = "none";
});

// Cuando el puntero del mouse se mueve, llama a la función TrackCursor.
document.addEventListener("mousemove", TrackCursor);

// Cuando se hace clic y se mantiene presionado, agrega una clase "active" al cursor personalizado.
document.addEventListener("mousedown", () => siteWideCursor.classList.add("active"));

// Cuando se suelta el clic, elimina la clase "active" del cursor personalizado.
document.addEventListener("mouseup", () => siteWideCursor.classList.remove("active"));

// Función para rastrear la posición del cursor.
function TrackCursor(evt) {
    const w = siteWideCursor.clientWidth; // Ancho del cursor personalizado.
    const h = siteWideCursor.clientHeight; // Altura del cursor personalizado.

    // Mueve el cursor personalizado a la posición del puntero del mouse.
    siteWideCursor.style.transform = `translate(${evt.clientX - w / 2}px, ${evt.clientY - h / 2}px)`;
}