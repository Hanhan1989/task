import { Request, Response, NextFunction, Router } from 'express';
import { TaskClass } from '../models/Task/TaskClass';
import { TaskRepository } from '../models/Task/TaskRepository';

const router = Router();

/* POST endpoint to receive data and create a new task */
router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const { new_task: titulo, posicion, texto } = req.body;
  const newTask: Omit<TaskClass, 'id'> = { titulo, estado: 'todo', posicion, texto };
  const taskRepository: TaskRepository = new TaskRepository();

  try {
    await taskRepository.createTask(newTask);
    res.status(200).json({ message: 'Datos recibidos correctamente', new_task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
});

/* POST endpoint to update only the title */
router.post('/update/title', async (req: Request, res: Response) => {
  try {
    const { id, titulo } = req.body;
    const taskRepository: TaskRepository = new TaskRepository();
    const existingTask: TaskClass | null = await taskRepository.getTaskById(id);

    if (!existingTask) {
      return res.status(400).json({ error: 'No se encuentra la tarea' });
    }

    existingTask.titulo = titulo; // Utiliza el setter para actualizar el título

    await taskRepository.updateTask(existingTask);
    res.status(200).json({ message: 'Tarea actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando la tarea' });
  }
});

/* POST endpoint to update */
router.post('/update', async (req: Request, res: Response) => {
  try {
    const { id, title, text } = req.body;
    const taskRepository: TaskRepository = new TaskRepository();
    const existingTask: TaskClass | null = await taskRepository.getTaskById(id);

    if (!existingTask) {
      return res.status(400).json({ error: 'No se encuentra la tarea' });
    }

    existingTask.titulo = title; // Utiliza el setter
    existingTask.texto = text;   // Utiliza el setter

    await taskRepository.updateTask(existingTask);
    res.status(200).json({ message: 'Tarea actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando la tarea' });
  }
});

/* POST endpoint to return specific task data */
router.post('/show/id', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const taskRepository: TaskRepository = new TaskRepository();
    const existingTask: TaskClass | null = await taskRepository.getTaskById(id);

    if (!existingTask) {
      return res.status(400).json({ error: 'No se encuentra la tarea' });
    }

    res.status(200).json({ message: 'Tarea encontrada correctamente', task: existingTask });
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo la tarea' });
  }
});

export default router;
