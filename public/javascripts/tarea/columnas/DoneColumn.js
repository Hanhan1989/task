import { Column } from "./Column.js";
import {STATES} from './States.js'

export class DoneColumn extends Column
{
     id = STATES.column3.id
     estado = STATES.column3.name
   
     constructor() {
        super(); // Llama al constructor de la clase base
        this.id = 'done-column'; // Asignar el id directamente
      }
    
      handleItemMoved(evt) {
        super.handleItemMoved(evt);
        // Lógica adicional específica para Columna1
        console.log('Lógica adicional para Columna done');
      }
}