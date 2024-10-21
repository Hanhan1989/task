export interface Task {
  id: number
  title: string
  text: string
  status: string
  position: number
  active: boolean
  created_at: string
  updated_at: string | null  // Fecha de actualización (puede ser null si no se ha actualizado)
}
