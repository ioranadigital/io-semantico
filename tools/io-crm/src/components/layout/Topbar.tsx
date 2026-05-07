import { Menu, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { GlobalSearch } from '@/components/shared/GlobalSearch'

export default function Topbar() {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/login'
  }

  return (
    <header className="border-b border-gray-300 bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-600" />
        <GlobalSearch />
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900"
      >
        <LogOut className="w-4 h-4" />
        Salir
      </button>
    </header>
  )
}
