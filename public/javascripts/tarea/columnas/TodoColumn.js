import { Column } from "./Column.js";

export class TodoColumn extends Column
{
    id = 'todo-column'
    estado = 'todo'

    constructor() {
        super(); // Llama al constructor de la clase base
      }
    
      handleItemMoved(evt) {
        super.handleItemMoved(evt);
        // Lógica adicional específica para Columna1
        console.log('Lógica adicional para Columna1 todo');
      }
}