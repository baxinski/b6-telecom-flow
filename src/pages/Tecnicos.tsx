
import React, { useState } from 'react'
import { Plus, Search, Users, Package } from 'lucide-react'
import { useTecnicos } from '@/hooks/useTecnicos'
import { useEquipamentos } from '@/hooks/useEquipamentos'

const Tecnicos = () => {
  const { tecnicos, loading: loadingTecnicos } = useTecnicos()
  const { equipamentos } = useEquipamentos()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTecnico, setSelectedTecnico] = useState<number | null>(null)

  const filteredTecnicos = tecnicos.filter(tecnico =>
    tecnico.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tecnico.matricula.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEquipamentosPorTecnico = (tecnicoId: number) => {
    return equipamentos.filter(eq => eq.tecnico_responsavel_id === tecnicoId)
  }

  if (loadingTecnicos) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando técnicos...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Técnicos</h1>
          <p className="text-gray-600">Gerenciamento de técnicos e seus estoques</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Novo Técnico
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar por nome ou matrícula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full md:w-80"
          />
        </div>
      </div>

      {/* Grid de Técnicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTecnicos.map((tecnico) => {
          const equipamentosTecnico = getEquipamentosPorTecnico(tecnico.id_tecnico)
          
          return (
            <div key={tecnico.id_tecnico} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tecnico.nome_completo}
                    </h3>
                    <p className="text-sm text-gray-500">Mat: {tecnico.matricula}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  tecnico.status_tecnico === 'Ativo' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {tecnico.status_tecnico}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="h-4 w-4 mr-2" />
                  {equipamentosTecnico.length} equipamentos
                </div>
                {tecnico.base_atendimento && (
                  <div className="text-sm text-gray-600">
                    Base: {tecnico.base_atendimento}
                  </div>
                )}
                {tecnico.contato_telefone && (
                  <div className="text-sm text-gray-600">
                    Tel: {tecnico.contato_telefone}
                  </div>
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => setSelectedTecnico(tecnico.id_tecnico)}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors"
                >
                  Ver Estoque
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors">
                  Editar
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de Estoque do Técnico */}
      {selectedTecnico && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Estoque - {tecnicos.find(t => t.id_tecnico === selectedTecnico)?.nome_completo}
                </h2>
                <button
                  onClick={() => setSelectedTecnico(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Fechar</span>
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {getEquipamentosPorTecnico(selectedTecnico).map((equipamento) => (
                  <div key={equipamento.id_equipamento} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{equipamento.numero_serie}</div>
                      <div className="text-sm text-gray-500">
                        {equipamento.modelo} - {equipamento.fabricante}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {equipamento.status_equipamento}
                      </span>
                    </div>
                  </div>
                ))}
                
                {getEquipamentosPorTecnico(selectedTecnico).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum equipamento atribuído a este técnico
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tecnicos
