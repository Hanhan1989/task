import { Request, Response, NextFunction, Router } from 'express'
import { Task } from '../models/Task/Task'
import { TaskRepository } from '../models/Task/TaskRepository'

const router = Router()

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Tarea'})
})

/* Get endpoint to receive taskes */
router.get('/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskRepository: TaskRepository = new TaskRepository();
    
    const tasks: Task[] = await taskRepository.getAllTasks();
    
    // Función para agrupar las tareas por estado
    const groupTasksByState = (state: string) => tasks.filter(task => task.estado === state);
    
    // Agrupación de tareas
    const tasksTodo = groupTasksByState('todo');
    const tasksWorking = groupTasksByState('working');
    const tasksDone = groupTasksByState('done');
    
    // Respuesta JSON con desestructuración
    res.status(200).json({
      message: 'Datos recibidos correctamente',
      tasksTodo,
      tasksWorking,
      tasksDone,
    });
  } catch (error) {
    next(error); // Manejo de errores
  }
})

/* POST endpoint to receive data */
router.post('/tarea/data', async(req: Request, res: Response, next: NextFunction) => {
  const { new_task: titulo, posicion } = req.body;
  const newTask: Omit<Task, 'id'> = { titulo, estado: 'todo', posicion };
  
  const taskRepository: TaskRepository = new TaskRepository();
  
  try {
    await taskRepository.createTask(newTask);
    console.log('Nueva tarea creada:', newTask);
    res.status(200).json({ message: 'Datos recibidos correctamente', new_task: newTask });
  } catch (error) {
    console.error('Error creando la tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
  
})

export default router
