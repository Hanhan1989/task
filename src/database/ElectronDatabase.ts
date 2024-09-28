import { DatabaseBase } from './DatabaseBase';
import { app } from 'electron'
import path from 'path'

export class ElectronDatabase extends DatabaseBase
{

  protected dbPath: string = path.join(app.getPath('userData'), 'myapp.db')

}
