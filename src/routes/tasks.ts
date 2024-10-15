import { Request, Response, NextFunction, Router } from 'express';
import { TaskClass } from '../models/Task/TaskClass';
import { TaskRepository } from '../models/Task/TaskRepository';

const router = Router();

/* Get endpoint to receive tasks */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskRepository: TaskRepository = new TaskRepository();
    const tasks: TaskClass[] = await taskRepository.getAllTasks();

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
});

/* POST endpoint to update tasks position and state */
router.post('/update', async (req: Request, res: Response) => {
  try {
    const tasks = req.body.tasks; // Accede al array tasks

    // Procesar cada tarea individualmente
    for (const task of tasks) {
      const { id, estado, posicion } = task; // Extraer los valores

      const taskRepository: TaskRepository = new TaskRepository();
      const existingTask: TaskClass | null = await taskRepository.getTaskById(id);

      if (!existingTask) {
        continue; // Saltar si no se encuentra la tarea
      }

      // Actualizar la tarea usando los setters
      existingTask.estado = estado;
      existingTask.posicion = posicion;

      await taskRepository.updateTask(existingTask);
    }

    res.status(200).json({ message: 'Tareas actualizadas correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando las tareas' });
  }
});

export default router;
