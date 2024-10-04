import { Request, Response, NextFunction, Router } from 'express'

const router = Router()

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {

    const columns: { id: string, title: string, task: string }[] = [
      {id: 'todo-column', title: 'Todo', task: 'tasksTodo'},
      {id:'working-column', title: 'Working', task: 'tasksWorking'},
      {id: 'done-column', title: 'Done', task: 'tasksDone'}
    ];

  res.render('index', { title: 'Tarea', columns: columns })
})

export default router
