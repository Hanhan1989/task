import { TinyMCEEditor } from "../TinyMCEEditor.js";

export class CommentsManager {

    comments = ko.observableArray([]);
    taskId = ko.observable()

    constructor(taskId) {
        this.taskId(taskId)
    }

    initialize(){

        // Inicializar TinyEditor
        const editor = new TinyMCEEditor('#comment-content')
        editor.defaultConfig.inline = false
        editor.defaultConfig.height = 200
        editor.defaultConfig.plugins = editor.defaultConfig.plugins.filter(item => item !== 'quickbars')
        editor.init()

        // Verifica si ya se aplicaron los bindings
        const comment_section = document.getElementById('comments-section')
        if (!ko.dataFor(comment_section)) {
            ko.applyBindings(this, comment_section)
        }

        this.fetchComments()

    }

    async fetchComments() {

        try {
            const response = await fetch('/comments/tarea/' + this.taskId())
            const data = await response.json()
            this.comments(data.comments)
        } catch (error) {
            console.error('Error al obtener los comments:', error)
        } 

    }

    async sendData() {
        // Obtiene el formulario y crea un objeto FormData
        const taskId = document.getElementById('task-id').value
        const form = document.querySelector('#comments-form')
        const formData = new FormData(form);
        formData.set('task_id', taskId)

        // Convertir FormData a un objeto simple para enviarlo como JSON
        const data = Object.fromEntries(formData.entries());

        console.log(data)

        try {
            const response = await fetch('/comment/create', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Envía el objeto JSON
            });

            if (!response.ok) {
                throw new Error('Error al enviar los datos: ' + response.statusText);
            }

            const result = await response.json();
            console.log('Datos enviados exitosamente:', result)

            // Refrescar los comentarios
            await this.fetchComments()

        } catch (error) {
            console.error('Error al enviar los datos:', error)
        }
    }

}


