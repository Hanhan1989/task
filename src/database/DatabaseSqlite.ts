import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { app } from 'electron'
import path from 'path'
import fs from 'fs' // Importa fs para leer archivos

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

// Lee el archivo .sql y lo ejecuta en la base de datos
  private async loadSchema(db: Database): Promise<void> {
    const schemaPath = path.join(__dirname, 'schema.sql') // El archivo .sql está en la misma carpeta que DatabaseSqlite
    const schema = fs.readFileSync(schemaPath, 'utf-8') // Lee el archivo .sql
    await db.exec(schema) // Ejecuta el contenido del archivo
  }

  async initialize(): Promise<void> {
    const db = await this.openDb()
    await this.loadSchema(db) // Carga y ejecuta el schema SQL
    console.log('Esquema cargado y tablas inicializadas.')
  }
}
