import { ModalHandler } from './ModalHandler.js'
import { TinyMCEEditor } from './TinyMCEEditor.js'

// Inicializar TinyMCEE Editor

const editor = new TinyMCEEditor('#text-content');
editor.init();

// Inicializar Modal para los detalles de la tarea
const modalHandler = new ModalHandler(editor)

