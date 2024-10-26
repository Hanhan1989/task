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

export default router
