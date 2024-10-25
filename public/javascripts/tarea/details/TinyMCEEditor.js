export class TinyMCEEditor {

    defaultConfig = {
      selector: '',  // Selecciona el campo de text enriquecido
      license_key: 'gpl', // Añade esta línea para usar la licencia GPL
      promotion: false, // Eliminar el botón de promoción
      plugins: ['link', 'image', 'code', 'quickbars'],
      menubar: false,
      inline: true,
      toolbar: 'undo redo | styleselect | bold italic | link image | code',
    }

    constructor(selector) {
      this.defaultConfig.selector = selector;
    }

    get selectorWithoutHash()
    {
      return this.defaultConfig.selector.replace('#', '')
    }

    init() {
      const editorExists = tinymce.get(this.selectorWithoutHash)
      if(!editorExists){
        tinymce.init(this.defaultConfig);
      }
    }

    setContent(text) {
      const content = text ?? ''
      tinymce.activeEditor.setContent(content)
    }

    getContent() {
      return tinymce.activeEditor.getContent()
    }

  }
  
  