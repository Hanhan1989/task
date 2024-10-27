import { Request, Response, NextFunction, Router } from 'express'
import { CommentClass } from '../models/Comment/CommentClass'
import { CommentRepository } from '../models/Comment/CommentRepository'

const router = Router()

router.get('/tarea/:task_id', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { task_id } = req.params
        const commentRepository: CommentRepository = new CommentRepository()
        const comments: CommentClass[] = await commentRepository.getCommentsByTaskId(Number(task_id))

        res.status(200).json({
            message: 'Datos recibidos correctamente', comments: comments
        });
    } catch (error) {
        next(error)
    }
})

export default router
