import { DatabaseBase } from './DatabaseBase'

import path from 'path';

export class WebDatabase extends DatabaseBase 
{

  protected dbPath: string = path.resolve(__dirname, '../../data/myapp.db')
  
}
