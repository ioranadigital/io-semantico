export const PRIORITY_COLORS: Record<string, string> = {
  'Alta': '#E24B4A',
  'Media': '#BA7517',
  'Baja': '#639922',
}

export const STATUS_COLORS: Record<string, string> = {
  'Nuevo': '#378ADD',
  'Cualificado': '#7F77DD',
  'En contacto': '#1D9E75',
  'Propuesta': '#D85A30',
  'Ganado': '#639922',
  'Perdido': '#E24B4A',
}

export const TICKET_SEVERITY: Record<string, string> = {
  'Crítico': '#E24B4A',
  'Alto': '#D85A30',
  'Medio': '#BA7517',
  'Bajo': '#639922',
}

export const DEAL_STAGES = [
  'Iniciado',
  'Negociación',
  'Propuesta',
  'Cierre',
  'Ganado',
  'Perdido',
]

export const HEALTH_THRESHOLDS = {
  excellent: 90,
  good: 70,
  warning: 50,
  critical: 0,
}
