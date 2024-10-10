async function handleSubmit(e) {
    e.preventDefault() // Evitar el comportamiento por defecto del formulario

     // Crear un objeto FormData con los datos del formulario
     const form = e.target
     const formData = new FormData(form)
     const tareasTodo = tasks.tasksTodo()
     console.log(tareasTodo)
     // Calcula la posición más baja de las tareas existentes y le suma 1 para asignar la nueva posición.
     // Esto asegura que la nueva tarea tendrá una posición única, justo después de la última tarea.
     const posicion = Math.max(...tareasTodo.map(item => Number(item.posicion))) + 1 
     formData.set('posicion', posicion)

     // Convertir FormData a un objeto simple para enviarlo como JSON
     const data = Object.fromEntries(formData.entries());

     try {
         // Enviar los datos a la URL mediante el método POST
         const response = await fetch('/task/create', {
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
             await tasks.fetchTasks()
             form.reset()
         } else {
             console.error('Error al enviar la tarea');
         }
     } catch (error) {
         console.error('Error en la solicitud:', error);
     }
}


const form = document.getElementById('form-new-task');
form.addEventListener('submit', handleSubmit);