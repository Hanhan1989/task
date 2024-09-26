
export class Column {
    // La clase hija asignará su propio id
    id = ''

    constructor() {

    }

    initSortable() {
        console.log(this.id)
        new Sortable(document.getElementById(this.id), {
            group: 'shared', // Agrupación compartida entre las columnas
            animation: 150,
            onEnd: (evt) => this.handleItemMoved(evt)
        });
    }

    handleItemMoved(evt) {
        console.log('Elemento movido:', evt.item.id);
        console.log('De columna:', evt.from.id);
        console.log('A columna:', evt.to.id);

        // Aquí puedes agregar la lógica que deseas ejecutar
    }
}
