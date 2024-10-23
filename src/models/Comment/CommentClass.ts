import { Comment } from "./Comment";

export class CommentClass implements Comment {
  private _id: number;
  private _task_id: number;
  private _text: string;
  private _created_at: string;

  constructor(
    id: number, 
    task_id: number, 
    text: string, 
    created_at: string
  ) {
    this._id = id;
    this._task_id = task_id;
    this._text = text;
    this._created_at = created_at;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get task_id(): number {
    return this._task_id;
  }

  get text(): string {
    return this._text;
  }

  get created_at(): string {
    return this._created_at;
  }

  // Setters
  set text(value: string) {
    this._text = value;
  }

  set task_id(value: number) {
    this._task_id = value;
  }
}
