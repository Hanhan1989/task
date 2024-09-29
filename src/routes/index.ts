import { Request, Response, NextFunction, Router } from 'express'
import { Task } from '../models/Task/Task'
import { TaskRepository } from '../models/Task/TaskRepository'

const router = Router()

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Tarea'})
})

/* Get endpoint to receive taskes */
router.get('/tasks', (req: Request, res: Response, next: NextFunction) => {
  const tasks: Task[] = [
    { id: 1, titulo: "Aprender TypeScript", estado: "todo", posicion: 10 },
    { id: 2, titulo: "Aprender Php", estado: "todo", posicion: 20 },
    { id: 3, titulo: "Aprender Javascript", estado: "todo", posicion: 30 },
    { id: 4, titulo: "Crear una aplicación", estado: "working", posicion: 200 },
    { id: 5, titulo: "Crear una página web", estado: "working", posicion: 230 },
    { id: 6, titulo: "Revisar el código", estado: "done", posicion: 300 }
  ]

 const tasksTodo: Task[] = tasks.filter(task => task.estado === "todo")
 const tasksWorking: Task[] = tasks.filter(task => task.estado === "working")
 const tasksDone: Task[] = tasks.filter(task => task.estado === "done")

  res.status(200).json({ message: 'Datos recibidos correctamente', tasksTodo: tasksTodo, tasksWorking: tasksWorking, tasksDone: tasksDone })
})

/* POST endpoint to receive data */
router.post('/tarea/data', (req: Request, res: Response, next: NextFunction) => {
  const receivedData = req.body
  const new_task: Omit<Task, 'id'>  = {titulo: receivedData.new_task, estado: 'todo', posicion: 400} 
  const taskRepository: TaskRepository = new TaskRepository()
  taskRepository.createTask(new_task)
  console.log('Datos recibidos:', receivedData.new_task)
  res.status(200).json({ message: 'Datos recibidos correctamente', new_task: new_task })
})

export default router
