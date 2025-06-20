
import { useState } from 'react'
import { Plus, Search, Calendar, User } from 'lucide-react'
import { useOrdemServico } from '@/hooks/useOrdemServico'
import { useTecnicos } from '@/hooks/useTecnicos'

const OrdensServico = () => {
  const { ordensServico, loading } = useOrdemServico()
  const { tecnicos } = useTecnicos()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [tecnicoFilter, setTecnicoFilter] = useState('')

  const filteredOS = ordensServico.filter(os => {
    const matchesSearch = os.nome_cliente_os?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         os.protocolo?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || os.status_os === statusFilter
    const matchesTecnico = !tecnicoFilter || os.tecnico_atribuido_id?.toString() === tecnicoFilter
    
    return matchesSearch && matchesStatus && matchesTecnico
  })

  const getTecnicoNome = (tecnicoId: number | null) => {
    if (!tecnicoId) return 'Não atribuído'
    const tecnico = tecnicos.find(t => t.id_tecnico === tecnicoId)
    return tecnico ? tecnico.nome_completo : 'Técnico não encontrado'
  }

  const statusOptions = [
    'Aberta',
    'Agendada', 
    'Em Andamento',
    'Concluída',
    'Cancelada',
    'Pendente Peça'
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      'Aberta': 'bg-gray-100 text-gray-800',
      'Agendada': 'bg-blue-100 text-blue-800',
      'Em Andamento': 'bg-yellow-100 text-yellow-800',
      'Concluída': 'bg-green-100 text-green-800',
      'Cancelada': 'bg-red-100 text-red-800',
      'Pendente Peça': 'bg-purple-100 text-purple-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando ordens de serviço...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ordens de Serviço</h1>
          <p className="text-gray-600">Gestão de atendimentos e serviços técnicos</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Nova OS
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por cliente ou protocolo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos os Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={tecnicoFilter}
            onChange={(e) => setTecnicoFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos os Técnicos</option>
            {tecnicos.map(tecnico => (
              <option key={tecnico.id_tecnico} value={tecnico.id_tecnico}>
                {tecnico.nome_completo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de OS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOS.map((os) => (
          <div key={os.id_os} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  OS #{os.id_os}
                </h3>
                {os.protocolo && (
                  <p className="text-sm text-gray-500">Protocolo: {os.protocolo}</p>
                )}
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(os.status_os)}`}>
                {os.status_os}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-600">Cliente:</span>
                <span className="ml-2 font-medium">{os.nome_cliente_os || 'Não informado'}</span>
              </div>
              
              {os.data_agendamento && (
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Agendamento:</span>
                  <span className="ml-2">
                    {new Date(os.data_agendamento).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-600">Técnico:</span>
                <span className="ml-2">{getTecnicoNome(os.tecnico_atribuido_id)}</span>
              </div>
            </div>

            {os.descricao_problema && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {os.descricao_problema}
                </p>
              </div>
            )}

            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors">
                Ver Detalhes
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOS.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Nenhuma ordem de serviço encontrada</div>
          <p className="text-gray-400 mt-2">Tente ajustar os filtros ou criar uma nova OS</p>
        </div>
      )}
    </div>
  )
}

export default OrdensServico
