
// import { TaskDetailManager } from './details/TaskDetailManager.js';

class Tasks {

    tasksTodo = ko.observableArray([]);
    tasksWorking = ko.observableArray([]);
    tasksDone = ko.observableArray([]);

    constructor() {
        this.fetchTasks();
    }

    async fetchTasks() {
        try {
            const response = await fetch('/tasks');
            const data = await response.json();
            this.tasksTodo(data.tasksTodo);
            this.tasksWorking(data.tasksWorking);
            this.tasksDone(data.tasksDone);
        } catch (error) {
            console.error('Error al obtener los tasks:', error);
        } finally {
            // const taskDetailManager = new TaskDetailManager(); 
            // taskDetailManager.initialize(); 
        }
    }

    // Habilita la edición del contenido
    enableEditing(task, event) {
        const element = event.target;
        element.contentEditable = true;
        element.focus(); // Enfoca el contenido editable
    }

    // Deshabilita la edición del contenido y guarda los cambios
    disableEditing(task, event) {
        const element = event.target;
        element.contentEditable = false; // Desactiva la edición
        const context_del_viewModel = ko.contextFor(event.target).$root;
        context_del_viewModel.saveChanges(task, element); // Guarda los cambios
    }

    // Guarda los cambios si el contenido ha cambiado
    saveChanges(task, element) {
        const originalValue = task._title.trim();
        const newValue = element.innerText.trim();

        if (newValue !== originalValue) {
            this.editTask(task, newValue); // Actualiza la tarea si ha cambiado el contenido
        }
    }

    // Método para manejar la actualización de la tarea
    editTask(task, newValue) {
        // Enviar la actualización al servidor
        fetch('/task/update/title', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: task._id, title: newValue }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la actualización');
            }
            return response.json();
        })
        .then(data => {
            console.log('Tarea actualizada:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    async deleteTask(task, event){
        console.log(task)

        try {
            const response = await fetch(`/task/delete/${task._id}`, {
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

            location.reload() 

            //Todo No funciona al cambiar una tarea de estado, es problema de la integración del sortablejs y knockout
            // const context_del_viewModel = ko.contextFor(event.target).$root;
            // await context_del_viewModel.fetchTasks()

        }
    }
}

// Instanciamos la clase Tasks y aplicamos los bindings
export const tasks = new Tasks();
ko.applyBindings(tasks, document.getElementById('columns'));
