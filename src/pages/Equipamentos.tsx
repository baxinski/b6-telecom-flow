
import React, { useState } from 'react'
import { Plus, Search, Filter, Download, Upload } from 'lucide-react'
import { useEquipamentos } from '@/hooks/useEquipamentos'
import { useTecnicos } from '@/hooks/useTecnicos'
import EquipmentTable from '@/components/equipment/EquipmentTable'

const Equipamentos = () => {
  const { equipamentos, loading, error, refetch } = useEquipamentos()
  const { tecnicos } = useTecnicos()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedEquipments, setSelectedEquipments] = useState<number[]>([])
  const [showNewEquipmentModal, setShowNewEquipmentModal] = useState(false)
  const [showBulkActionsModal, setShowBulkActionsModal] = useState(false)

  const getTecnicoNome = (tecnicoId: number) => {
    const tecnico = tecnicos.find(t => t.id_tecnico === tecnicoId)
    return tecnico ? tecnico.nome_completo : 'Não encontrado'
  }

  const filteredEquipamentos = equipamentos.filter(eq => {
    const matchesSearch = eq.numero_serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (eq.modelo && eq.modelo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (eq.fabricante && eq.fabricante.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = !statusFilter || eq.status_equipamento === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleSelectEquipment = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedEquipments([...selectedEquipments, id])
    } else {
      setSelectedEquipments(selectedEquipments.filter(equipId => equipId !== id))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEquipments(filteredEquipamentos.map(eq => eq.id_equipamento))
    } else {
      setSelectedEquipments([])
    }
  }

  const statusOptions = [
    'Em Estoque Central',
    'Com Técnico',
    'Instalado',
    'Em Manutenção',
    'Defeituoso',
    'Usado'
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando equipamentos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Erro: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Equipamentos</h1>
          <p className="text-gray-600">Controle do estoque central e ciclo de vida dos equipamentos</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowNewEquipmentModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Equipamento
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors">
            <Upload className="h-4 w-4 mr-2" />
            Importar CSV
          </button>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por número série, modelo ou fabricante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full md:w-80"
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
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {filteredEquipamentos.length} equipamentos
            </span>
            {selectedEquipments.length > 0 && (
              <button
                onClick={() => setShowBulkActionsModal(true)}
                className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-md hover:bg-yellow-200 transition-colors"
              >
                {selectedEquipments.length} selecionados
              </button>
            )}
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Equipamentos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <EquipmentTable
          equipamentos={filteredEquipamentos}
          selectedEquipments={selectedEquipments}
          onSelectEquipment={handleSelectEquipment}
          onSelectAll={handleSelectAll}
          onEdit={(equipment) => console.log('Editar:', equipment)}
          onDelete={(equipment) => console.log('Excluir:', equipment)}
          onShowHistory={(equipment) => console.log('Histórico:', equipment)}
          isDeleting={false}
          getTecnicoNome={getTecnicoNome}
        />
      </div>
    </div>
  )
}

export default Equipamentos
