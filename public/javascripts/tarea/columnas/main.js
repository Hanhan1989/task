import { TodoColumn } from './TodoColumn.js'
import { WorkingColumn } from './WorkingColumn.js'
import { DoneColumn } from './DoneColumn.js'

const todoColumn = new TodoColumn()
todoColumn.initSortable()

const workingColumn = new WorkingColumn()
workingColumn.initSortable()

const doneColumn = new DoneColumn()
doneColumn.initSortable()