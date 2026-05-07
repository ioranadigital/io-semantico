import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmtEur(value: number | null | undefined): string {
  if (value === null || value === undefined) return '€0,00'
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export async function safeQuery<T>(
  query: Promise<{ data: T | null; error: any }>
): Promise<T | null> {
  const { data, error } = await query
  if (error) {
    console.error('Supabase error:', error)
    return null
  }
  return data
}
