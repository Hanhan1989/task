export class ColumnHelper {
    // Método para obtener el estado basado en la columna
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
