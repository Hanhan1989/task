export interface Comment {
    id: number;
    task_id: number;  // Relaciona con la tarea
    text: string;
    created_at: string;  // Fecha de creación (se genera automáticamente)
}