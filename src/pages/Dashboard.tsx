
import React from 'react'
import { Package, Users, ClipboardList, AlertTriangle } from 'lucide-react'
import { useEquipamentos } from '@/hooks/useEquipamentos'
import { useTecnicos } from '@/hooks/useTecnicos'

const Dashboard = () => {
  const { equipamentos, loading: loadingEquipamentos } = useEquipamentos()
  const { tecnicos, loading: loadingTecnicos } = useTecnicos()

  // Calcular estatísticas
  const totalEquipamentos = equipamentos.length
  const equipamentosEstoque = equipamentos.filter(eq => eq.localizacao_atual === 'Estoque Central').length
  const equipamentosComTecnicos = equipamentos.filter(eq => eq.tecnico_responsavel_id).length
  const equipamentosInstalados = equipamentos.filter(eq => eq.status_equipamento === 'Instalado').length
  
  const totalTecnicos = tecnicos.length
  const tecnicosAtivos = tecnicos.filter(t => t.status_tecnico === 'Ativo').length

  const stats = [
    {
      title: 'Total de Equipamentos',
      value: totalEquipamentos,
      icon: Package,
      color: 'bg-blue-500',
      description: 'Equipamentos cadastrados'
    },
    {
      title: 'Estoque Central',
      value: equipamentosEstoque,
      icon: Package,
      color: 'bg-green-500',
      description: 'Equipamentos disponíveis'
    },
    {
      title: 'Com Técnicos',
      value: equipamentosComTecnicos,
      icon: Users,
      color: 'bg-yellow-500',
      description: 'Equipamentos em campo'
    },
    {
      title: 'Instalados',
      value: equipamentosInstalados,
      icon: ClipboardList,
      color: 'bg-purple-500',
      description: 'Em clientes'
    },
    {
      title: 'Técnicos Ativos',
      value: tecnicosAtivos,
      icon: Users,
      color: 'bg-indigo-500',
      description: `Total: ${totalTecnicos}`
    }
  ]

  const equipamentosPorStatus = equipamentos.reduce((acc, eq) => {
    acc[eq.status_equipamento] = (acc[eq.status_equipamento] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (loadingEquipamentos || loadingTecnicos) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Visão geral do sistema B6 Telecom
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Gráficos e tabelas resumidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipamentos por Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Equipamentos por Status
          </h2>
          <div className="space-y-3">
            {Object.entries(equipamentosPorStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{status}</span>
                <span className="font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas e Notificações */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Alertas do Sistema
          </h2>
          <div className="space-y-3">
            {equipamentosEstoque < 10 && (
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-red-800">Estoque Baixo</p>
                  <p className="text-xs text-red-600">
                    Apenas {equipamentosEstoque} equipamentos no estoque central
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <Package className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Sistema Operacional</p>
                <p className="text-xs text-green-600">
                  Todos os módulos funcionando normalmente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
