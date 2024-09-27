import {TaskData} from './TaskInterface'

export class Task implements TaskData {
    id: number;
  titulo: string;
  estado: string;
  posicion: number;

  // Constructor para inicializar las propiedades
  constructor(id: number, titulo: string, estado: string, posicion: number) {
    this.id = id;
    this.titulo = titulo;
    this.estado = estado;
    this.posicion = posicion;
  }

  // Método para actualizar el estado de la tarea
  actualizarEstado(nuevoEstado: string): void {
    this.estado = nuevoEstado;
  }

  // Método para mostrar la información de la tarea
  mostrarInfo(): string {
    return `ID: ${this.id}, Título: ${this.titulo}, Estado: ${this.estado}, Posición: ${this.posicion}`;
  }
}