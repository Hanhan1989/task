import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { DatabaseSqlite } from './database/DatabaseSqlite'

import indexRouter from './routes/index'
import taskRouter from './routes/task'
import tasksRouter from './routes/tasks'

const app = express()
const db = DatabaseSqlite.getInstance()

// base de datos
db.openDb().then(() => {
  db.initialize()
})

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
app.use('/task', taskRouter)
app.use('/tasks', tasksRouter)

// Configurar la carpeta 'node_modules' como estática para servir Bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404))
})

// error handler
app.use((err: createError.HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
