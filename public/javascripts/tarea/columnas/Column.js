
export class Column {
    // La clase hija asignará su propio id
    id = ''
    estado = ''

    constructor() {

    }

    initSortable() {
        new Sortable(document.getElementById(this.id), {
            group: 'shared', // Agrupación compartida entre las columnas
            animation: 150,
            onEnd: (evt) => this.handleItemMoved(evt)
        });
    }

    async handleItemMoved(evt) {
        console.log('Elemento movido:', evt.item.id)
        console.log('De columna:', evt.from.id)
        console.log('A columna:', evt.to.id)

        // Accediendo al valor de data-task-id desde el elemento movido
        const taskId = Number(evt.item.dataset.taskId);
        const estado = this.getColumName(evt)
        const data = {id: taskId, estado: estado, posicion: 8}

     try {
         // Enviar los datos a la URL mediante el método POST
         const response = await fetch('/tarea/update', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(data), // Convertir el objeto a JSON
         });

         // Verificar si la petición fue exitosa
         if (response.ok) {
             const result = await response.json()
             console.log('Tarea enviada:', result)
         } else {
             console.error('Error al enviar la tarea')
         }
     } catch (error) {
         console.error('Error en la solicitud:', error)
     }
    }

    
    getColumName(evt) {
        let estado;
        switch (evt.to.id) {
            case 'todo-column':
                estado = 'todo';
                break;
            case 'working-column':
                estado = 'working';
                break;
            case 'done-column':
                estado = 'done';
                break;
            default:
                estado = 'unknown'; // Por si acaso, en caso de que no coincida
        }
    
        return estado;
    }
}
