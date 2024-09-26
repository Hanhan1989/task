import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Tarea' });
});

/* POST endpoint to receive data */
router.post('/tarea/data', (req: Request, res: Response, next: NextFunction) => {
  const receivedData = req.body; 
  console.log('Datos recibidos:', receivedData.new_task);
  res.status(200).json({ message: 'Datos recibidos correctamente', data: receivedData });
});

export default router;
