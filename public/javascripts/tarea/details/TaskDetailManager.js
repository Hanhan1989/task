import { ModalHandler } from './ModalHandler.js';
import { TinyMCEEditor } from './TinyMCEEditor.js';

export class TaskDetailManager {
  constructor() {
    this.editor = new TinyMCEEditor('#text-content');
    this.modalHandler = null;
  }

  initialize() {
    // Inicializar el editor TinyMCE
    this.editor.init();

    // Inicializar el modal para los detalles de la tarea con el editor como dependencia
    this.modalHandler = new ModalHandler(this.editor);
  }
}
