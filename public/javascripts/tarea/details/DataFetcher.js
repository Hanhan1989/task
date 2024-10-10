export class DataFetcher {
    constructor() {}

    // Función para obtener los datos
    async takeData(taskId) {
        try {
            const response = await fetch('/task/show/id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: taskId }), // Enviamos el taskId en el cuerpo
            });

            if (!response.ok) {
                throw new Error('Network response was not ok'); // Lanza un error si la respuesta no es exitosa
            }

            const data = await response.json();
            return data.task; // Devolver los datos obtenidos
        } catch (error) {
            console.error('Error fetching task data:', error);
            return null; // Retornar null en caso de error
        }
    }
}
