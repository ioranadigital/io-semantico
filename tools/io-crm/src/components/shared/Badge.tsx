interface BadgeProps {
  label: string
  bg: string
  color?: string
  className?: string
}

export function Badge({ label, bg, color = '#fff', className }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  )
}
