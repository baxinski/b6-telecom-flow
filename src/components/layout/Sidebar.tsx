
import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ClipboardList, 
  ArrowRightLeft,
  X 
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Equipamentos', href: '/equipamentos', icon: Package },
    { name: 'Técnicos', href: '/tecnicos', icon: Users },
    { name: 'Ordens de Serviço', href: '/ordens-servico', icon: ClipboardList },
    { name: 'Movimentação', href: '/movimentacao', icon: ArrowRightLeft },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <span className="font-bold text-lg">B6</span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-lg font-bold text-gray-900">B6 Telecom</h1>
              <p className="text-xs text-gray-500">Sistema de Gestão</p>
            </div>
          </div>
          <button 
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onToggle()
                }
              }}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Versão 1.0.0</p>
            <p>© 2024 B6 Telecom</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
