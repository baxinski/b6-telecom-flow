
import { Plus, Shield, User } from 'lucide-react'
import { useTecnicos } from '@/hooks/useTecnicos'

const Usuarios = () => {
  const { tecnicos } = useTecnicos()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
          <p className="text-gray-600">Controle de acesso e permissões do sistema</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </button>
      </div>

      {/* Tipos de Usuário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Administradores</h2>
              <p className="text-gray-600">Acesso total ao sistema</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900">Sistema Principal</div>
              <div className="text-sm text-gray-600">Admin Master</div>
            </div>
          </div>
          
          <button className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors">
            Gerenciar Admins
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Técnicos</h2>
              <p className="text-gray-600">Acesso limitado para campo</p>
            </div>
          </div>
          
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {tecnicos.slice(0, 5).map((tecnico) => (
              <div key={tecnico.id_tecnico} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{tecnico.nome_completo}</div>
                <div className="text-sm text-gray-600">Mat: {tecnico.matricula}</div>
              </div>
            ))}
            {tecnicos.length > 5 && (
              <div className="text-sm text-gray-500 text-center">
                + {tecnicos.length - 5} outros técnicos
              </div>
            )}
          </div>
          
          <button className="mt-4 w-full px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-md hover:bg-green-100 transition-colors">
            Gerenciar Técnicos
          </button>
        </div>
      </div>

      {/* Permissões e Configurações */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Configurações de Acesso</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Permissões de Administrador</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Gestão completa de equipamentos</li>
              <li>✓ Cadastro e edição de técnicos</li>
              <li>✓ Criação e atribuição de OS</li>
              <li>✓ Relatórios e dashboards</li>
              <li>✓ Gestão de usuários</li>
              <li>✓ Configurações do sistema</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Permissões de Técnico</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Visualizar suas OS atribuídas</li>
              <li>✓ Atualizar status de OS</li>
              <li>✓ Gerenciar seu estoque</li>
              <li>✓ Registrar equipamentos instalados/retirados</li>
              <li>✗ Criar novas OS</li>
              <li>✗ Gerenciar outros usuários</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usuarios
