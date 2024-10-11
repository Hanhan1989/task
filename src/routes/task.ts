import { Request, Response, NextFunction, Router } from 'express'
import { Task } from '../models/Task/Task'
import { TaskRepository } from '../models/Task/TaskRepository'

const router = Router()

/* POST endpoint to receive data and create new task */
router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const { new_task: titulo, posicion, texto } = req.body;
  const newTask: Omit<Task, 'id'> = { titulo, estado: 'todo', posicion, texto };
  const taskRepository: TaskRepository = new TaskRepository();

  try {
    await taskRepository.createTask(newTask);
    res.status(200).json({ message: 'Datos recibidos correctamente', new_task: newTask });
  } catch (error) {
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
      return res.status(400).json({ error: 'no se encuentra la tarea' });
    }

    const taskToUpdate: Task = {
      ...existingTask,
      titulo: titulo,
    }

    await taskRepository.updateTask(taskToUpdate);
    res.status(200).json({ message: 'Tareas actualizadas correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando las tareas' });
  }
})

/* POST endpoint to update*/
router.post('/update', async (req: Request, res: Response) => {
  try {
    const { id, title, text } = req.body; // Accede al array tasks
    const taskRepository: TaskRepository = new TaskRepository();
    const existingTask: Task | null = await taskRepository.getTaskById(id);

    if (!existingTask) {
      return res.status(400).json({ error: 'no se encuentra la tarea' });
    }

    const taskToUpdate: Task = {
      ...existingTask,
      titulo: title,
      texto: text
    }

    await taskRepository.updateTask(taskToUpdate);
    res.status(200).json({ message: 'Tareas actualizadas correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando las tareas' });
  }
})

/* POST endpoint to return specific task data */
router.post('/show/id', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const taskRepository: TaskRepository = new TaskRepository();
    const existingTask: Task | null = await taskRepository.getTaskById(id);

    if (!existingTask) {
      return res.status(400).json({ error: 'no se encuentra la tarea' });
    }

    res.status(200).json({ message: 'Tareas actualizadas correctamente' , task: existingTask });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando las tareas' });
  }
})


export default router
