export class FormFiller {
    constructor(editor) {
        this.editor = editor;
    }

    fillFormFields(task) {
        const titleInput = document.getElementById('title');
        if (titleInput) {
            titleInput.value = task.titulo;
        }

        // Usar el editor ya inicializado para establecer el contenido
        if (this.editor) {
            this.editor.setContent(task.texto);
        }
    }
}
