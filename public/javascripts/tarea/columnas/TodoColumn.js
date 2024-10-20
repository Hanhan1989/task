import { Column } from "./Column.js";
import {STATES} from './States.js'

export class TodoColumn extends Column
{
    id = STATES.column1.id
    status = STATES.column1.name

    constructor() {
        super(); // Llama al constructor de la clase base
      }
    
      handleItemMoved(evt) {
        super.handleItemMoved(evt);
        // Lógica adicional específica para Columna1
        console.log('Lógica adicional para Columna1 todo');
      }
}