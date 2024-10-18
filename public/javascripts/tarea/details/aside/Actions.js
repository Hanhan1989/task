import { tasks } from "../../column_data.js"

export class Actions {

    constructor(modal) {
        this.modal = modal
    }

    initialize(){
        const actions_column = document.getElementById('actions-column')
        
        // Verifica si ya se aplicaron los bindings
        if (!ko.dataFor(actions_column)) {
            ko.applyBindings(this, actions_column)
        }
    }

    get taskId() {
        return document.getElementById('task-id').value
    }

    async deleteTask() {
        try {
            const response = await fetch(`/task/delete/${this.taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error('Error al eliminar la tarea:', error)
        } finally {
            this.modal.closeModal()
            // Refrescar los datos de las columnas, tasks es una variable global de KnockoutJs
            await tasks.fetchTasks()
        }
    }
    
    closeTask() {
        console.log("CLOSE EVENT", this.taskId)
    }

}


