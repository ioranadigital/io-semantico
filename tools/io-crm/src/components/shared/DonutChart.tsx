interface DonutChartProps {
  used: number
  total: number
  label?: string
  color?: string
}

export function DonutChart({ used, total, label, color = '#7F77DD' }: DonutChartProps) {
  const percentage = (used / total) * 100
  const circumference = 2 * Math.PI * 45

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * percentage) / 100}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dashoffset 0.3s' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm font-medium">{Math.round(percentage)}%</p>
          <p className="text-xs text-gray-600">{used}h / {total}h</p>
        </div>
      </div>
      {label && <p className="text-xs text-gray-600 mt-3">{label}</p>}
    </div>
  )
}
