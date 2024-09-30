import { Column } from "./Column.js";

export class DoneColumn extends Column
{
     id = 'done-column'
     estado = 'done'
   
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