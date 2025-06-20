
import { useState } from 'react'
import { Plus, Search, Download, Upload, Filter, Grid, List } from 'lucide-react'
import { useEquipamentos } from '@/hooks/useEquipamentos'
import { useTecnicos } from '@/hooks/useTecnicos'
import EquipmentTable from '@/components/equipment/EquipmentTable'
import EquipmentModal from '@/components/equipment/EquipmentModal'
import { BulkImportModal } from '@/components/equipment/BulkImportModal'

const Equipamentos = () => {
  const { equipamentos, loading, error, refetch } = useEquipamentos()
  const { tecnicos } = useTecnicos()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedEquipments, setSelectedEquipments] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [showNewEquipmentModal, setShowNewEquipmentModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

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

  const totalPages = Math.ceil(filteredEquipamentos.length / itemsPerPage)
  const paginatedEquipamentos = filteredEquipamentos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSelectEquipment = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedEquipments([...selectedEquipments, id])
    } else {
      setSelectedEquipments(selectedEquipments.filter(equipId => equipId !== id))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEquipments(paginatedEquipamentos.map(eq => eq.id_equipamento))
    } else {
      setSelectedEquipments([])
    }
  }

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      'Em Estoque Central': 'bg-blue-100 text-blue-800 border-blue-200',
      'Com Técnico': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Instalado': 'bg-green-100 text-green-800 border-green-200',
      'Em Manutenção': 'bg-orange-100 text-orange-800 border-orange-200',
      'Defeituoso': 'bg-red-100 text-red-800 border-red-200',
      'Usado': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
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
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando equipamentos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
          <div className="text-red-600 text-xl mb-2">⚠️ Erro ao carregar dados</div>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Modern Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gestão de Equipamentos</h1>
            <p className="text-blue-100 text-lg">Controle completo do ciclo de vida dos equipamentos</p>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{filteredEquipamentos.length} equipamentos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>{selectedEquipments.length} selecionados</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setShowNewEquipmentModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Novo Equipamento
            </button>
            <button 
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Upload className="h-5 w-5 mr-2" />
              Importar CSV
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por número série, modelo ou fabricante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200 min-w-48"
              >
                <option value="">Todos os Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'table'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
            </div>
            
            <button className="inline-flex items-center px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-all duration-200">
              <Download className="h-5 w-5 mr-2" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Equipment Table/Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {filteredEquipamentos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum equipamento encontrado</h3>
            <p className="text-gray-500 mb-6">
              {equipamentos.length === 0 
                ? 'Comece cadastrando seu primeiro equipamento'
                : 'Ajuste os filtros para encontrar o que procura'
              }
            </p>
            {equipamentos.length === 0 && (
              <button 
                onClick={() => setShowNewEquipmentModal(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Primeiro Equipamento
              </button>
            )}
          </div>
        ) : (
          <>
            <EquipmentTable
              equipamentos={paginatedEquipamentos}
              selectedEquipments={selectedEquipments}
              onSelectEquipment={handleSelectEquipment}
              onSelectAll={handleSelectAll}
              onEdit={(equipment) => console.log('Editar:', equipment)}
              onDelete={(equipment) => console.log('Excluir:', equipment)}
              onShowHistory={(equipment) => console.log('Histórico:', equipment)}
              isDeleting={false}
              getTecnicoNome={getTecnicoNome}
            />
            
            {/* Modern Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, filteredEquipamentos.length)}
                    </span>{' '}
                    de <span className="font-medium">{filteredEquipamentos.length}</span> equipamentos
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Anterior
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showNewEquipmentModal && (
        <EquipmentModal
          isOpen={showNewEquipmentModal}
          onClose={() => setShowNewEquipmentModal(false)}
          onSave={refetch}
        />
      )}

      {showImportModal && (
        <BulkImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImportComplete={refetch}
        />
      )}
    </div>
  )
}

export default Equipamentos
