import { Request, Response, NextFunction, Router } from 'express'
import { CommentClass } from '../models/Comment/CommentClass';
import { CommentRepository } from '../models/Comment/CommentRepository';

const router = Router()

router.put('/create', async (req: Request, res: Response, next: NextFunction) => {

    const { task_id, text } = req.body;
    const newComment: Omit<CommentClass, 'id' | 'created_at'> = { task_id, text };
    const commentRepository: CommentRepository = new CommentRepository();

    try {
        await commentRepository.createComment(newComment);
        res.status(200).json({ message: 'Datos recibidos correctamente', new_comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario', error });
    }
})

// Método DELETE para "eliminar" un comentario por su ID
router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params // Captura el ID desde los parámetros de la URL

        // Verifica que el ID sea válido
        if (!id) {
            return res.status(400).json({ message: 'ID del comentario es requerido.' })
        }

        // Llama al método para eliminar el comentario en el repositorio
        const commentRepository = new CommentRepository()
        await commentRepository.deleteComment(Number(id)) // Convierte el ID a número

        // Responde con un mensaje de éxito
        return res.json({ message: `Comentario con ID ${id} eliminado exitosamente` })
    } catch (error) {
        console.error('Error al eliminar el comentario:', error)
        return res.status(500).json({ message: 'Error interno del servidor' })
    }
})

export default router
