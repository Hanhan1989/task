import {ColumnHelper} from './ColumnHelper.js'

export class Column {
    // La clase hija asignará su propio id
    id = ''
    status = ''

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
        const columnHelper = new ColumnHelper();
        const status = columnHelper.getColumName(evt)
        // Obtenemos todos los elementos de la columna "a la que fue movido" el ítem
        const items = Array.from(evt.to.children);

        // Recorremos todos los elementos para capturar sus IDs y positiones
        const tasks = items.map((item, index) => ({
            id: Number(item.dataset.taskId), // Capturamos el taskId desde el atributo data-task-id
            status: status, // status de la columna donde está el ítem
            position: index + 1 // Nueva posición (sumamos 1 porque index es cero-based)
        }));

        try {
            // Enviar los datos a la URL mediante el método POST
            const response = await fetch('/tasks/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({tasks}), // Convertir el objeto a JSON
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

}
