import { Task } from "./Task";

export class TaskClass implements Task {
  private _id: number;
  private _titulo: string;
  private _texto: string;
  private _estado: string;
  private _posicion: number;

  constructor(id: number, titulo: string, texto: string, estado: string, posicion: number) {
    this._id = id;
    this._titulo = titulo;
    this._texto = texto;
    this._estado = estado;
    this._posicion = posicion;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get titulo(): string {
    return this._titulo;
  }

  get texto(): string {
    return this._texto;
  }

  get estado(): string {
    return this._estado;
  }

  get posicion(): number {
    return this._posicion;
  }

  // Setters
  set titulo(value: string) {
    this._titulo = value;
  }

  set texto(value: string) {
    this._texto = value;
  }

  set estado(value: string) {
    this._estado = value;
  }

  set posicion(value: number) {
    this._posicion = value;
  }
}
