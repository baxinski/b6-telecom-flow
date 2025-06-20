
import React, { useState, useMemo } from 'react'
import { Edit, Trash2, History, ChevronDown, ChevronUp } from 'lucide-react'
import type { Tables } from '@/integrations/supabase/types'

type Equipamento = Tables<'equipamento'>

interface EquipmentTableRowProps {
  equipment: Equipamento
  isSelected: boolean
  onSelect: (checked: boolean) => void
  onEdit: (equipment: Equipamento) => void
  onDelete: (equipment: Equipamento) => void
  onShowHistory: (equipment: Equipamento) => void
  isDeleting: boolean
  getTecnicoNome: (tecnicoId: number) => string
}

const EquipmentTableRow: React.FC<EquipmentTableRowProps> = ({
  equipment,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onShowHistory,
  isDeleting,
  getTecnicoNome
}) => {
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

  return (
    <tr className={`hover:bg-gray-50 transition-colors duration-150 ${isSelected ? 'bg-blue-50' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">{equipment.numero_serie}</div>
        {equipment.codigo_barras && (
          <div className="text-xs text-gray-500">{equipment.codigo_barras}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{equipment.modelo || '-'}</div>
        {equipment.fabricante && (
          <div className="text-xs text-gray-500">{equipment.fabricante}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(equipment.status_equipamento)}`}>
          {equipment.status_equipamento}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {equipment.localizacao_atual}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {equipment.tecnico_responsavel_id ? getTecnicoNome(equipment.tecnico_responsavel_id) : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {equipment.base_atendimento || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(equipment)}
            className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-150"
            title="Editar"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onShowHistory(equipment)}
            className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-all duration-150"
            title="Histórico"
          >
            <History className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(equipment)}
            disabled={isDeleting}
            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-150 disabled:opacity-50"
            title="Excluir"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

interface EquipmentTableProps {
  equipamentos: Equipamento[]
  selectedEquipments: number[]
  onSelectEquipment: (id: number, checked: boolean) => void
  onSelectAll: (checked: boolean) => void
  onEdit: (equipment: Equipamento) => void
  onDelete: (equipment: Equipamento) => void
  onShowHistory: (equipment: Equipamento) => void
  isDeleting: boolean
  getTecnicoNome: (tecnicoId: number) => string
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({
  equipamentos,
  selectedEquipments,
  onSelectEquipment,
  onSelectAll,
  onEdit,
  onDelete,
  onShowHistory,
  isDeleting,
  getTecnicoNome
}) => {
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortedEquipamentos = useMemo(() => {
    if (!sortField) return equipamentos

    return [...equipamentos].sort((a, b) => {
      let aValue = a[sortField as keyof Equipamento]
      let bValue = b[sortField as keyof Equipamento]

      if (aValue === null || aValue === undefined) aValue = ''
      if (bValue === null || bValue === undefined) bValue = ''

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [equipamentos, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <th 
      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </th>
  )

  const isAllSelected = equipamentos.length > 0 && selectedEquipments.length === equipamentos.length

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
              />
            </th>
            <SortableHeader field="numero_serie">
              Número Série
            </SortableHeader>
            <SortableHeader field="modelo">
              Modelo / Fabricante
            </SortableHeader>
            <SortableHeader field="status_equipamento">
              Status
            </SortableHeader>
            <SortableHeader field="localizacao_atual">
              Localização
            </SortableHeader>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Técnico Responsável
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Base Atendimento
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedEquipamentos.map((equipment) => (
            <EquipmentTableRow
              key={equipment.id_equipamento}
              equipment={equipment}
              isSelected={selectedEquipments.includes(equipment.id_equipamento)}
              onSelect={(checked) => onSelectEquipment(equipment.id_equipamento, checked)}
              onEdit={onEdit}
              onDelete={onDelete}
              onShowHistory={onShowHistory}
              isDeleting={isDeleting}
              getTecnicoNome={getTecnicoNome}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EquipmentTable
