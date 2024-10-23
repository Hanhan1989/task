import { tasks } from "../../column_data.js"

export class CommentsManager {

    comments = ko.observableArray([]);

    constructor(
    ) {
        this.fetchComments()
    }

    initialize(){
        const comment_section = document.getElementById('comments-section')
        
        // Verifica si ya se aplicaron los bindings
        if (!ko.dataFor(comment_section)) {
            ko.applyBindings(this, comment_section)
        }
    }


    get taskId() {
        return document.getElementById('task-id').value
    }

    fetchComments() {
        this.comments([{text: 'hola'}, {text: 'mundo'}])
    }

}


