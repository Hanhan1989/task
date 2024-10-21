import { Task } from "./Task";

export class TaskClass implements Task {
  private _id: number;
  private _title: string;
  private _text: string;
  private _status: string;
  private _position: number;
  private _active: boolean;
  private _created_at: string;
  private _updated_at: string | null;

  constructor(
    id: number, 
    title: string, 
    text: string, 
    status: string, 
    position: number, 
    active: boolean, 
    created_at: string, 
    updated_at: string | null
  ) {
    this._id = id;
    this._title = title;
    this._text = text;
    this._status = status;
    this._position = position;
    this._active = active;
    this._created_at = created_at;
    this._updated_at = updated_at;
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

  get active(): boolean {
    return this._active;
  }

  get created_at(): string {
    return this._created_at;
  }

  get updated_at(): string | null {
    return this._updated_at;
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

  set active(value: boolean) {
    this._active = value;
  }

  set updated_at(value: string | null) {
    this._updated_at = value;
  }
}
