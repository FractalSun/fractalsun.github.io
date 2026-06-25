/*
 * 1. Se guardan referencias al botón y a <html>, donde vive :root.dark{}.
 * 2. toggleTheme() agrega/quita la clase "dark" del <html>, actualiza el
 *    texto del botón (🌙 = ya está en oscuro, ☀️ = ya está en claro) y
 *    guarda la elección en localStorage para futuras visitas.
 * 3. addEventListener conecta el clic del botón con toggleTheme(); sin
 *    esta línea la función nunca se ejecutaría.
 * 4. Al cargar la página (una sola vez), se revisa localStorage o, si es
 *    la primera visita, la preferencia del sistema operativo, para
 *    decidir si arrancar en modo oscuro o claro.
 */

const toggleButton = document.getElementById('toggle-mode');
const htmlElement = document.documentElement;

// Función para alternar el tema
function toggleTheme() {
    const isDark = htmlElement.classList.toggle('dark');
    toggleButton.textContent = isDark ? 'modo:🌙' : 'modo:☀️';
    localStorage.setItem('fs-mode', isDark ? 'dark' : 'light');
}

// Evento del botón
toggleButton.addEventListener('click', toggleTheme);

// Cargar preferencia guardada o detectar la del sistema
const savedTheme = localStorage.getItem('fs-mode');
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
    toggleButton.textContent = 'modo:🌙';
} else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlElement.classList.add('dark');
    toggleButton.textContent = 'modo:🌙';
}