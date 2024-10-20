import { Task } from "./Task";

export class TaskClass implements Task {
  private _id: number;
  private _title: string;
  private _text: string;
  private _status: string;
  private _position: number;

  constructor(id: number, title: string, text: string, status: string, position: number) {
    this._id = id;
    this._title = title;
    this._text = text;
    this._status = status;
    this._position = position;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get text(): string {
    return this._text;
  }

  get status(): string {
    return this._status;
  }

  get position(): number {
    return this._position;
  }

  // Setters
  set title(value: string) {
    this._title = value;
  }

  set text(value: string) {
    this._text = value;
  }

  set status(value: string) {
    this._status = value;
  }

  set position(value: number) {
    this._position = value;
  }
}
