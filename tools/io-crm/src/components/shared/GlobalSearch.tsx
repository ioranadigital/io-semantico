import { useState } from 'react'
import { Search } from 'lucide-react'
import { useGlobalSearch } from '@/hooks/useGlobalSearch'

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const { results } = useGlobalSearch()

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 px-3 py-2">
        <Search className="w-4 h-4 text-gray-600" />
        <input
          type="text"
          placeholder="Buscar clientes, contactos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none text-sm"
        />
      </div>
      {query && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-300 shadow-lg">
          {results.map((r) => (
            <div
              key={`${r.type}-${r.id}`}
              className="px-4 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer text-sm"
            >
              <p className="font-medium">{r.name || r.company || r.contact_name}</p>
              <p className="text-xs text-gray-600">{r.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
