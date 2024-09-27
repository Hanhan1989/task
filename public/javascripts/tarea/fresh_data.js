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
}

const viewModelInstance = new ViewModel();
ko.applyBindings(viewModelInstance);
