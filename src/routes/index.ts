import { Request, Response, NextFunction, Router } from 'express'
import { Task } from '../models/Task/Task'
import { TaskRepository } from '../models/Task/TaskRepository'

const router = Router()

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Tarea' })
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
router.post('/tarea/data', async (req: Request, res: Response, next: NextFunction) => {
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

/* POST endpoint to update data */
router.post('/tarea/update', async (req: Request, res: Response) => {
  try {
      const tasks = req.body.tasks; // Accede al array tasks

      // Procesar cada tarea individualmente
      for (const task of tasks) {
          const { id, estado, posicion } = task; // Extraer los valores

          const taskRepository: TaskRepository = new TaskRepository();
          const existingTask: Task | null = await taskRepository.getTaskById(id);

          if (!existingTask) {
              console.log(`Tarea con ID ${id} no encontrada`);
              continue; // Saltar si no se encuentra la tarea
          }

          // Actualizar la tarea manteniendo el título original
          const taskToUpdate: Task = {
              id: id,
              titulo: existingTask.titulo, // Mantenemos el título existente
              estado: estado,
              posicion: posicion,
          };

          await taskRepository.updateTask(taskToUpdate);
      }

      res.status(200).json({ message: 'Tareas actualizadas correctamente' });
  } catch (error) {
      console.error('Error actualizando las tareas:', error);
      res.status(500).json({ message: 'Error actualizando las tareas' });
  }
})


/* POST endpoint to update data */
router.post('/tarea/update/titulo', async (req: Request, res: Response) => {
  try {
    const { id, titulo } = req.body; // Accede al array tasks
    const taskRepository: TaskRepository = new TaskRepository();
    const existingTask: Task | null = await taskRepository.getTaskById(id);

    if (!existingTask) {
      console.log(`Tarea con ID ${id} no encontrada`);
      return res.status(400).json({ error: 'no se encuentra la tarea' });
    }

    const taskToUpdate: Task = {
      ...existingTask,
      id: id,
      titulo: titulo, // Mantenemos el título existente
    }

    await taskRepository.updateTask(taskToUpdate);
    res.status(200).json({ message: 'Tareas actualizadas correctamente' });
  } catch (error) {
    console.error('Error actualizando las tareas:', error);
    res.status(500).json({ message: 'Error actualizando las tareas' });
  }
})


export default router
