import { Column } from "./Column.js";
import {STATES} from './States.js'

export class WorkingColumn extends Column
{
  id = STATES.column2.id
  status = STATES.column2.name

    constructor() {
        super(); // Llama al constructor de la clase base
      }
    
      handleItemMoved(evt) {
        super.handleItemMoved(evt);
        // Lógica adicional específica para Columna1
        console.log('Lógica adicional para Columna working');
      }
}