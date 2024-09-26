async function handleSubmit(e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
}


const form = document.getElementById('ajax-form');
form.addEventListener('submit', handleSubmit);