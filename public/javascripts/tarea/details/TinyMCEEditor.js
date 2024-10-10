
export class TinyMCEEditor {
    constructor(selector) {
      this.selector = selector;
    }
  
    init() {
      tinymce.init({
        selector: this.selector,  // Selecciona el campo de texto enriquecido
        license_key: 'gpl', // Añade esta línea para usar la licencia GPL
        promotion: false, // Eliminar el botón de promoción
        plugins: 'link image code',
        toolbar: 'undo redo | styleselect | bold italic | link image | code',
      });
    }

    setContent(content) {
      if(content){
        tinymce.get(this.selector.substring(1)).setContent(content)
      }
    }

  }
  
  