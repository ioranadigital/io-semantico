interface MetricCardProps {
  label: string
  value: string | number
  sub?: string
  alert?: boolean
}

export function MetricCard({ label, value, sub, alert }: MetricCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${alert ? 'bg-red-50 border-red-200' : 'bg-white border-gray-300'}`}>
      <p className="text-xs text-gray-600 mb-2">{label}</p>
      <p className="text-2xl font-medium">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  )
}
