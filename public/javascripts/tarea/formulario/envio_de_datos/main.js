async function handleSubmit(e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

     // Crear un objeto FormData con los datos del formulario
     const form = e.target;
     const formData = new FormData(form);

     // Convertir FormData a un objeto simple para enviarlo como JSON
     const data = Object.fromEntries(formData.entries());

     try {
         // Enviar los datos a la URL mediante el método POST
         const response = await fetch('/tarea/data', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(data), // Convertir el objeto a JSON
         });

         // Verificar si la petición fue exitosa
         if (response.ok) {
             const result = await response.json();
             console.log('Tarea enviada:', result);
             tasks.tasksTodo.push(result.new_task)
         } else {
             console.error('Error al enviar la tarea');
         }
     } catch (error) {
         console.error('Error en la solicitud:', error);
     }
}


const form = document.getElementById('ajax-form');
form.addEventListener('submit', handleSubmit);