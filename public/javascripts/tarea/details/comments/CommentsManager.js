import { tasks } from "../../column_data.js"
import { TinyMCEEditor } from "../TinyMCEEditor.js";

export class CommentsManager {

    comments = ko.observableArray([]);

    constructor(
    ) {
        this.fetchComments()
    }

    initialize(){

        // Inicializar TinyEditor
        const editor = new TinyMCEEditor('#comments-form textarea')
        editor.defaultConfig.inline = false
        editor.defaultConfig.height = 200
        editor.defaultConfig.plugins = editor.defaultConfig.plugins.filter(item => item !== 'quickbars')
        editor.init()

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


