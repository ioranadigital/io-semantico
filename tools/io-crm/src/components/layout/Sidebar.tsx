import { Link } from 'react-router-dom'
import {
  Home,
  Users,
  TrendingUp,
  Settings,
  Zap,
  FileText,
  Clock,
  BarChart3,
} from 'lucide-react'

const MENU = [
  {
    section: 'CRM',
    items: [
      { icon: Home, label: 'Dashboard', href: '/dashboard' },
      { icon: Users, label: 'Clientes', href: '/clients' },
      { icon: TrendingUp, label: 'Leads', href: '/leads' },
      { icon: Users, label: 'Contactos', href: '/contacts' },
      { icon: TrendingUp, label: 'Pipeline', href: '/pipeline' },
      { icon: FileText, label: 'Propuestas', href: '/proposals' },
      { icon: Clock, label: 'Tickets', href: '/tickets' },
    ],
  },
  {
    section: 'Operaciones',
    items: [
      { icon: BarChart3, label: 'Proyectos', href: '/projects' },
      { icon: Clock, label: 'Tareas', href: '/tasks' },
      { icon: FileText, label: 'Entregas', href: '/deliverables' },
      { icon: Clock, label: 'Mantenimiento', href: '/maintenance' },
    ],
  },
  {
    section: 'Rentabilidad',
    items: [
      { icon: Clock, label: 'Time Tracking', href: '/time-tracking' },
      { icon: FileText, label: 'Gastos', href: '/expenses' },
      { icon: BarChart3, label: 'Rentabilidad', href: '/profitability' },
    ],
  },
  {
    section: 'Más',
    items: [
      { icon: FileText, label: 'Actividad', href: '/activity' },
      { icon: FileText, label: 'Documentos', href: '/docs' },
      { icon: Zap, label: 'Automatizaciones', href: '/automations' },
      { icon: BarChart3, label: 'Analítica', href: '/analytics' },
      { icon: Settings, label: 'Configuración', href: '/users' },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-300 overflow-y-auto">
      <div className="p-6 border-b border-gray-300">
        <h1 className="text-lg font-medium text-gray-900">CRM Pro</h1>
      </div>
      <nav className="p-4">
        {MENU.map((section, i) => (
          <div key={i} className="mb-6">
            <p className="text-xs font-medium text-gray-600 mb-3 uppercase">{section.section}</p>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
