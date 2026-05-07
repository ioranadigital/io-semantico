interface ProgressBarProps {
  value: number
  max?: number
  label?: string
}

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  let color = '#639922'
  if (percentage < 50) color = '#E24B4A'
  else if (percentage < 75) color = '#BA7517'

  return (
    <div>
      {label && <p className="text-xs font-medium mb-2">{label}</p>}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
