import { DataFetcher } from './DataFetcher.js'
import { FormFiller } from './FormFiller.js'

export class ModalHandler {
    constructor(editor) {
        this.modalTriggers = document.querySelectorAll('.modal-trigger')
        this.bootstrapModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
        this.dataFetcher = new DataFetcher()
        this.formFiller = new FormFiller(editor)
        this.initialize()
    }

    // Inicializar event listeners
    initialize() {
        this.modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => this.handleTriggerClick(e))
        })
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

        // Mostrar el modal usando await
        await this.showModal()
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
