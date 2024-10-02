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
        const contexto_del_viewModel = ko.contextFor(event.target).$root;
        contexto_del_viewModel.saveChanges(task, element); // Guarda los cambios
    }

    // Guarda los cambios si el contenido ha cambiado
    saveChanges(task, element) {
        const originalValue = task.titulo.trim();
        const newValue = element.innerText.trim();

        if (newValue !== originalValue) {
            this.editTask(task, newValue); // Actualiza la tarea si ha cambiado el contenido
        }
    }

    // Método para manejar la actualización de la tarea
    editTask(task, newValue) {
        // Enviar la actualización al servidor
        fetch('/tarea/update/titulo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: task.id, titulo: newValue }),
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
}

// Instanciamos la clase Tasks y aplicamos los bindings
const tasks = new Tasks();
ko.applyBindings(tasks);
