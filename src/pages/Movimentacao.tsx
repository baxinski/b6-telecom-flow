
import { useState } from 'react'
import { Package, ArrowRight, ArrowLeft, ArrowUpDown, Plus, Search, Calendar, User } from 'lucide-react'
import { useEquipamentos } from '@/hooks/useEquipamentos'
import { useTecnicos } from '@/hooks/useTecnicos'

const Movimentacao = () => {
  const { equipamentos } = useEquipamentos()
  const { tecnicos } = useTecnicos()
  const [activeTab, setActiveTab] = useState('registrar')
  const [tipoMovimentacao, setTipoMovimentacao] = useState('entrada')
  const [searchTerm, setSearchTerm] = useState('')

  const movimentacoes = [
    {
      id: 1,
      equipamento: 'Roteador Cisco RV130',
      tipo: 'entrada',
      tecnico: 'João Silva',
      data: '2024-06-20',
      local: 'Estoque Central'
    },
    {
      id: 2,
      equipamento: 'Modem Technicolor',
      tipo: 'saida',
      tecnico: 'Maria Santos',
      data: '2024-06-19',
      local: 'Cliente - Rua A, 123'
    },
    {
      id: 3,
      equipamento: 'Switch TP-Link 8 portas',
      tipo: 'transferencia',
      tecnico: 'Carlos Lima',
      data: '2024-06-18',
      local: 'Estoque Filial Norte'
    }
  ]

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'entrada': return <ArrowLeft className="h-4 w-4 text-green-600" />
      case 'saida': return <ArrowRight className="h-4 w-4 text-red-600" />
      case 'transferencia': return <ArrowUpDown className="h-4 w-4 text-blue-600" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'entrada': return 'bg-green-100 text-green-800'
      case 'saida': return 'bg-red-100 text-red-800'
      case 'transferencia': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Movimentação de Equipamentos</h1>
        <p className="text-gray-600">Controle de entrada, saída e transferência de equipamentos</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('registrar')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'registrar'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Registrar Movimentação
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'historico'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Histórico
          </button>
        </nav>
      </div>

      {activeTab === 'registrar' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário de Movimentação */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <Package className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Nova Movimentação</h2>
            </div>

            <form className="space-y-4">
              {/* Tipo de Movimentação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Movimentação
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTipoMovimentacao('entrada')}
                    className={`p-3 rounded-lg border text-center ${
                      tipoMovimentacao === 'entrada'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <ArrowLeft className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Entrada</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoMovimentacao('saida')}
                    className={`p-3 rounded-lg border text-center ${
                      tipoMovimentacao === 'saida'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <ArrowRight className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Saída</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoMovimentacao('transferencia')}
                    className={`p-3 rounded-lg border text-center ${
                      tipoMovimentacao === 'transferencia'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <ArrowUpDown className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Transferência</span>
                  </button>
                </div>
              </div>

              {/* Equipamento */}
              <div>
                <label htmlFor="equipamento" className="block text-sm font-medium text-gray-700">
                  Equipamento
                </label>
                <select
                  id="equipamento"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Selecione um equipamento</option>
                  {equipamentos.slice(0, 10).map((equipamento) => (
                    <option key={equipamento.id_equipamento} value={equipamento.id_equipamento}>
                      {equipamento.modelo} - {equipamento.numero_serie}
                    </option>
                  ))}
                </select>
              </div>

              {/* Técnico */}
              <div>
                <label htmlFor="tecnico" className="block text-sm font-medium text-gray-700">
                  Técnico Responsável
                </label>
                <select
                  id="tecnico"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Selecione um técnico</option>
                  {tecnicos.map((tecnico) => (
                    <option key={tecnico.id_tecnico} value={tecnico.id_tecnico}>
                      {tecnico.nome_completo} - {tecnico.matricula}
                    </option>
                  ))}
                </select>
              </div>

              {/* Local */}
              <div>
                <label htmlFor="local" className="block text-sm font-medium text-gray-700">
                  {tipoMovimentacao === 'entrada' ? 'Local de Origem' : 
                   tipoMovimentacao === 'saida' ? 'Local de Destino' : 'Local de Destino'}
                </label>
                <input
                  type="text"
                  id="local"
                  placeholder={tipoMovimentacao === 'entrada' ? 'Ex: Fornecedor XYZ' : 
                              tipoMovimentacao === 'saida' ? 'Ex: Cliente - Rua A, 123' : 'Ex: Estoque Filial Norte'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Data */}
              <div>
                <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                  Data da Movimentação
                </label>
                <input
                  type="date"
                  id="data"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Observações */}
              <div>
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  rows={3}
                  placeholder="Observações adicionais sobre a movimentação..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Registrar Movimentação
              </button>
            </form>
          </div>

          {/* Resumo Rápido */}
          <div className="space-y-6">
            {/* Estatísticas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Movimentações Hoje</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                    <ArrowLeft className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Entradas</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-2">
                    <ArrowRight className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <div className="text-sm text-gray-600">Saídas</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                    <ArrowUpDown className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">Transferências</div>
                </div>
              </div>
            </div>

            {/* Movimentações Recentes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Últimas Movimentações</h3>
              <div className="space-y-3">
                {movimentacoes.slice(0, 3).map((mov) => (
                  <div key={mov.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {getTipoIcon(mov.tipo)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{mov.equipamento}</div>
                        <div className="text-xs text-gray-600">{mov.tecnico}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTipoColor(mov.tipo)}`}>
                      {mov.tipo === 'entrada' ? 'Entrada' : 
                       mov.tipo === 'saida' ? 'Saída' : 'Transferência'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'historico' && (
        <div className="bg-white rounded-lg shadow-md">
          {/* Filtros */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por equipamento, técnico..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">Todos os tipos</option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
                <option value="transferencia">Transferência</option>
              </select>
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tabela de Histórico */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Técnico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Local
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movimentacoes.map((mov) => (
                  <tr key={mov.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTipoIcon(mov.tipo)}
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getTipoColor(mov.tipo)}`}>
                          {mov.tipo === 'entrada' ? 'Entrada' : 
                           mov.tipo === 'saida' ? 'Saída' : 'Transferência'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mov.equipamento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{mov.tecnico}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mov.local}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {new Date(mov.data).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Movimentacao
