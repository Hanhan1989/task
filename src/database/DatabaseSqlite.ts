import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { app } from 'electron'
import path from 'path'

export class DatabaseSqlite {
  private static instance: DatabaseSqlite | null = null
  private db: Database | null = null
  private dbPath: string = ''

  private constructor() {
    this.setDbPath()
  }

  // Singleton: Retorna la única instancia de la clase
  public static getInstance(): DatabaseSqlite {
    if (!DatabaseSqlite.instance) {
      DatabaseSqlite.instance = new DatabaseSqlite()
    }
    return DatabaseSqlite.instance
  }

  private setDbPath(): void {
    // Detecta si el entorno es Electron o Web
    if (this.isElectron()) {
      this.dbPath = path.join(app.getPath('userData'), 'mytask.db')
    } else {
      this.dbPath = path.resolve(__dirname, '../../data/mytask.db')
    }
  }

  private isElectron(): boolean {
    // Comprueba si el entorno es Electron
    return !!(process.versions as any).electron
  }

  // Abre la conexión si no está ya abierta
  async openDb(): Promise<Database> {
    if (!this.db) {
      this.db = await open({
        filename: this.dbPath,
        driver: sqlite3.Database,
      })
    }
    return this.db
  }

  async initialize(): Promise<void> {
    const db = await this.openDb()
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        estado TEXT,
        posicion INTEGER
      )
    `)
    console.log('Tabla "tasks" creada o ya existente.')
  }

}
