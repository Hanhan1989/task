import { Column } from "./Column.js";

export class WorkingColumn extends Column
{
    id = 'working-column'
    estado = 'working'

    constructor() {
        super(); // Llama al constructor de la clase base
      }
    
      handleItemMoved(evt) {
        super.handleItemMoved(evt);
        // Lógica adicional específica para Columna1
        console.log('Lógica adicional para Columna working');
      }
}