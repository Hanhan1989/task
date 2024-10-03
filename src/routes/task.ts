import { Request, Response, NextFunction, Router } from 'express'
import { Task } from '../models/Task/Task'
import { TaskRepository } from '../models/Task/TaskRepository'

const router = Router()

/* POST endpoint to receive data and create new task*/
router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
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

/* POST endpoint to update only title */
router.post('/update/title', async (req: Request, res: Response) => {
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
      titulo: titulo,
    }

    await taskRepository.updateTask(taskToUpdate);
    res.status(200).json({ message: 'Tareas actualizadas correctamente' });
  } catch (error) {
    console.error('Error actualizando las tareas:', error);
    res.status(500).json({ message: 'Error actualizando las tareas' });
  }
})


export default router
