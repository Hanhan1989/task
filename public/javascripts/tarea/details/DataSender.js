import { tasks } from "../column_data.js";

export class DataSender {
    constructor(modal, editor) {
      this.modal = modal;
      this.editor = editor;
    }
  
    async sendData() {
      // Obtiene el formulario y crea un objeto FormData
      const form = document.querySelector('#form-details');
      const formData = new FormData(form);
      formData.set('text', this.editor.getContent())
  
      // Convertir FormData a un objeto simple para enviarlo como JSON
      const data = Object.fromEntries(formData.entries());
  
      try {
        const response = await fetch('/task/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Envía el objeto JSON
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar los datos: ' + response.statusText);
        }
  
        const result = await response.json();
        console.log('Datos enviados exitosamente:', result);

        // Refrescar los datos de las columnas, tasks es una variable global de KnockoutJs
        await tasks.fetchTasks()

        // Cierra el modal si es necesario
        this.modal.closeModal();
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }
  }
  