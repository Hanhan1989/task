import { Column } from "./Column.js";

export class WorkingColumn extends Column
{
    constructor() {
        super(); // Llama al constructor de la clase base
        this.id = 'working-column'; // Asignar el id directamente
      }
    
      handleItemMoved(evt) {
        super.handleItemMoved(evt);
        // Lógica adicional específica para Columna1
        console.log('Lógica adicional para Columna working');
      }
}