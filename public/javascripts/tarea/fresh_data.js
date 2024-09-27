class ViewModel {

    tasksTodo = ko.observableArray([])
    tasksWorking = ko.observableArray([])
    tasksDone = ko.observableArray([])

    constructor() {
        this.fetchTasks();
    }

    async fetchTasks() {
        try {
            const response = await fetch('/tasks') 
            const data = await response.json();
            this.tasksTodo(data.tasksTodo);
            this.tasksWorking(data.tasksWorking)
            this.tasksDone(data.tasksDone)
        } catch (error) {
            console.error('Error al obtener los tasks:', error);
        }
    }

    editTask(task, event) {
        const originalValue = task.titulo.trim();
        const newValue = event.target.innerText.trim();

        if (newValue !== originalValue) {
            console.log('Valor cambiado:', newValue);
            console.log('Id de la tarea:', task.id)
            // Aquí podrías enviar la actualización al servidor o realizar alguna acción
        }
    }
}

const viewModelInstance = new ViewModel();
ko.applyBindings(viewModelInstance);
