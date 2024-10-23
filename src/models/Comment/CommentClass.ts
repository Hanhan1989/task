import { Comment } from "./Comment";

export class CommentClass implements Comment {
  private _id: number;
  private _task_id: number;
  private _comment_text: string;
  private _created_at: string;

  constructor(
    id: number, 
    task_id: number, 
    comment_text: string, 
    created_at: string
  ) {
    this._id = id;
    this._task_id = task_id;
    this._comment_text = comment_text;
    this._created_at = created_at;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get task_id(): number {
    return this._task_id;
  }

  get comment_text(): string {
    return this._comment_text;
  }

  get created_at(): string {
    return this._created_at;
  }

  // Setters
  set comment_text(value: string) {
    this._comment_text = value;
  }

  set task_id(value: number) {
    this._task_id = value;
  }
}
