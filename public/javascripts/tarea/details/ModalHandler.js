import { DataFetcher } from './DataFetcher.js'
import { FormFiller } from './FormFiller.js'
import { DataSender } from './DataSender.js'
import { Actions } from './aside/Actions.js'

export class ModalHandler {
    constructor(editor) {
        this.modalTriggers = document.querySelectorAll('.modal-trigger')
        this.bootstrapModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
        this.dataFetcher = new DataFetcher()
        this.dataSender = new DataSender(this, editor)
        this.formFiller = new FormFiller(editor)
        this.initialize()
    }

    // Inicializar event listeners
    initialize() {
        this.modalTriggers.forEach(trigger => {
            // Listener para abrir el Modal clicando los ... de las tareas
            trigger.addEventListener('click', (e) => this.handleTriggerClick(e))
        })

        // Evento click para el botón del envío de datos al servidor
        document.querySelector('#save-task-details').addEventListener('click', () => this.dataSender.sendData());
        // Añadir evento correspondiente a los enlaces de la columna Aside
        const actions = new Actions(this)
        actions.initialize()
    }

    // Manejar el evento de click de cada modal trigger
    async handleTriggerClick(event) {
        const taskId = this.getTaskId(event)
        console.log('Task ID:', taskId)

        // Obtener los datos usando DataFetcher
        const data = await this.dataFetcher.takeData(taskId);

        // Si se obtienen datos, llenar los campos con FormFiller
        if (data) {
            this.formFiller.fillFormFields(data);
        }

        //Poner el valor del id de la tarea en el campo oculto del formulario #form-details
        document.getElementById('task-id').value = taskId

        // Mostrar el modal usando await
        await this.showModal()
    }

    // Cerrar el modal
    closeModal() {
        this.bootstrapModal.hide();
    }


    // Obtener el ID de la tarea
    getTaskId(event) {
        const parentItem = event.target.closest('.list-group-item')
        return parentItem.getAttribute('data-task-id')
    }

    // Mostrar el modal con async/await
    async showModal() {
        this.bootstrapModal.show()
    }
}
