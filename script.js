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