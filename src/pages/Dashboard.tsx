import { Package, CheckCircle, Clock, Activity, Plus, Users, ArrowUpRight } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Executivo</h1>
        <p className="text-gray-600">Visão estratégica em tempo real</p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Equipamentos Totais</h3>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +5% vs período anterior
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-500 uppercase">OS Concluídas</h3>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +12% vs período anterior
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-500 uppercase">OS Pendentes</h3>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <p className="text-sm text-red-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                -8% vs período anterior
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Atividades Recentes</h2>
          </div>
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Nenhuma atividade recente encontrada</p>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="bg-blue-600 p-3 rounded-full mb-2">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900">Novo Equipamento</span>
              <span className="text-sm text-gray-600">Cadastrar novo equipamento</span>
            </button>

            <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="bg-green-600 p-3 rounded-full mb-2">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900">Nova OS</span>
              <span className="text-sm text-gray-600">Criar ordem de serviço</span>
            </button>

            <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="bg-purple-600 p-3 rounded-full mb-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900">Novo Técnico</span>
              <span className="text-sm text-gray-600">Cadastrar técnico</span>
            </button>

            <button className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <div className="bg-orange-600 p-3 rounded-full mb-2">
                <ArrowUpRight className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900">Movimentação</span>
              <span className="text-sm text-gray-600">Registrar movimentação</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer do Sistema */}
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">Sistema de Gestão B6 Telecom</p>
      </div>
    </div>
  )
}

export default Dashboard
