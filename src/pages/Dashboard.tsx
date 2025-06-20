
import { Package, CheckCircle, Clock, Activity, Plus, Users, ArrowUpRight, ArrowRightLeft, Wrench, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics'
import { useRecentActivities } from '@/hooks/useRecentActivities'

const Dashboard = () => {
  const navigate = useNavigate()
  const { metrics, loading: metricsLoading } = useDashboardMetrics()
  const { activities, loading: activitiesLoading } = useRecentActivities()

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: 'os' | 'movimentacao' | 'equipamento') => {
    switch (type) {
      case 'os':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'movimentacao':
        return <ArrowRightLeft className="h-4 w-4 text-blue-600" />
      case 'equipamento':
        return <Package className="h-4 w-4 text-purple-600" />
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Executivo</h1>
        <p className="text-gray-600 mt-1">Visão estratégica em tempo real</p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Equipamentos Totais</h3>
              <div className="flex items-center mt-1">
                <span className="text-3xl font-bold text-gray-900">
                  {metricsLoading ? '...' : formatNumber(metrics.totalEquipamentos)}
                </span>
              </div>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <BarChart3 className="h-4 w-4 mr-1" />
                {formatNumber(metrics.equipamentosAtivos)} ativos
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
              <div className="flex items-center mt-1">
                <span className="text-3xl font-bold text-gray-900">
                  {metricsLoading ? '...' : formatNumber(metrics.osConcluidas)}
                </span>
              </div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Performance otimizada
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
              <div className="flex items-center mt-1">
                <span className="text-3xl font-bold text-gray-900">
                  {metricsLoading ? '...' : formatNumber(metrics.osPendentes)}
                </span>
              </div>
              <p className="text-sm text-orange-600 flex items-center mt-1">
                <Clock className="h-4 w-4 mr-1" />
                Requer atenção
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Métricas Secundárias */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estoque Central</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metricsLoading ? '...' : formatNumber(metrics.equipamentosEstoque)}
              </p>
            </div>
            <Package className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Em Manutenção</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metricsLoading ? '...' : formatNumber(metrics.equipamentosManutencao)}
              </p>
            </div>
            <Wrench className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Técnicos Ativos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metricsLoading ? '...' : formatNumber(metrics.tecnicosAtivos)}
              </p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Equipamentos Ativos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metricsLoading ? '...' : formatNumber(metrics.equipamentosAtivos)}
              </p>
            </div>
            <Activity className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Atividades Recentes</h2>
            </div>
            <button 
              onClick={() => navigate('/movimentacao')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Ver todas
            </button>
          </div>
          
          <div className="space-y-4">
            {activitiesLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Carregando atividades...</p>
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Activity className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Nenhuma atividade recente encontrada</p>
              </div>
            )}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/equipamentos')}
              className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="bg-blue-600 p-3 rounded-full mb-2">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm">Novo Equipamento</span>
              <span className="text-xs text-gray-600 text-center">Cadastrar equipamento</span>
            </button>

            <button 
              onClick={() => navigate('/ordens-servico')}
              className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="bg-green-600 p-3 rounded-full mb-2">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm">Nova OS</span>
              <span className="text-xs text-gray-600 text-center">Criar ordem de serviço</span>
            </button>

            <button 
              onClick={() => navigate('/tecnicos')}
              className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="bg-purple-600 p-3 rounded-full mb-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm">Novo Técnico</span>
              <span className="text-xs text-gray-600 text-center">Cadastrar técnico</span>
            </button>

            <button 
              onClick={() => navigate('/movimentacao')}
              className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <div className="bg-orange-600 p-3 rounded-full mb-2">
                <ArrowRightLeft className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm">Movimentação</span>
              <span className="text-xs text-gray-600 text-center">Registrar movimentação</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
