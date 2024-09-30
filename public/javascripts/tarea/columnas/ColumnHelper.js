import {STATES} from './States.js'

export class ColumnHelper {
    // Método para obtener el estado basado en la columna
    getColumName(evt) {
        let state;

        switch (evt.to.id) {
            case STATES.column1.id:
                state = STATES.column1.name;
                break;
            case STATES.column2.id:
                state = STATES.column2.name;
                break;
            case STATES.column3.id:
                state = STATES.column3.name;
                break;
            default:
                state = 'unknown'; // Por si acaso, en caso de que no coincida
        }

        return state;
    }
}
