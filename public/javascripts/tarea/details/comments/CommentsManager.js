import { TinyMCEEditor } from "../TinyMCEEditor.js";

export class CommentsManager {

    comments = ko.observableArray([]);
    taskId = ko.observable()
    editor = null

    constructor(taskId) {
        this.taskId(taskId)
    }

    initialize() {
        // Inicializar TinyEditor
        this.editor = new TinyMCEEditor('#comment-content')
        this.editor.defaultConfig.inline = false
        this.editor.defaultConfig.height = 200
        this.editor.defaultConfig.plugins = this.editor.defaultConfig.plugins.filter(item => item !== 'quickbars')
        this.editor.init()

      const comment_section = document.getElementById('comments-section')
      if (!ko.dataFor(comment_section)) {
          ko.applyBindings(this, comment_section)
      }

        this.fetchComments()
    }
    
    commentCardTemplate(comments) {
        let htmlString = '';
    
        comments.forEach(comment => {
            htmlString += `<div class="card mt-2" data-id="${comment._id}">
                <div class="card-header">
                    <div class="comment-date">
                        <span>${comment._created_at}</span>
                        <div class="comment-delete float-end">
                            <span class="bi bi-x delete-button"></span>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text comment-text">${comment._text}</p>
                </div>
            </div>`;
        });
    
        return htmlString;
    }
    

    async fetchComments() {

        try {
            const response = await fetch('/comments/tarea/' + this.taskId())
            const data = await response.json()
            console.log(data.comments)
            const commentsContainer = document.querySelector("#comments-section .comments");
            commentsContainer.innerHTML = this.commentCardTemplate(data.comments);
    
            // Agregar event listeners a cada botón de eliminar después de renderizar el HTML
            commentsContainer.querySelectorAll(".delete-button").forEach(button => {
                button.addEventListener("click", (e) => {
                    const commentId = e.target.closest(".card").getAttribute("data-id");
                    this.deleteComment(commentId, e); // Llamada al método de la clase
                });
            });
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
        } finally {
            this.editor.setContent('') // Limpia el campo del editor después de enviar los datos
        }
    }

    async deleteComment (commentId, e) {
        
        try {
            const response = await fetch(`/comment/delete/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: commentId})
            })
    
            if (!response.ok) {
                throw new Error('Error al eliminar el comentario')
            }
    
            const result = await response.json()
            console.log('Comentario eliminado:', result)

            this.fetchComments()
            
        } catch (error) {
            console.error('Error al eliminar el comentario:', error)
        }

    }

}


