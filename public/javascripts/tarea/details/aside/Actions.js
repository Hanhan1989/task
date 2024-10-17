
export class Actions {

    constructor() {}

    initialize(){
        ko.applyBindings(this, document.getElementById('actions-column'));
    }

    get taskId() {
        return document.getElementById('task-id').value;
    }

    deleteTask() {
        console.log("DELETE EVENT", this.taskId)
    }
    
    closeTask() {
        console.log("CLOSE EVENT", this.taskId)
    }

}


