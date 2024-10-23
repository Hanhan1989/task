export interface Comment {
    id: number;
    task_id: number;  // Relaciona con la tarea
    comment_text: string;
    created_at: string;  // Fecha de creación (se genera automáticamente)
}