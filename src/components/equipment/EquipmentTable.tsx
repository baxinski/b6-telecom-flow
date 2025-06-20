
import React, { useState, useMemo } from 'react'
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
  return (
    <tr className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {equipment.numero_serie}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {equipment.modelo || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {equipment.fabricante || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {equipment.status_equipamento}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {equipment.localizacao_atual}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {equipment.tecnico_responsavel_id ? getTecnicoNome(equipment.tecnico_responsavel_id) : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {equipment.base_atendimento || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(equipment)}
            className="text-blue-600 hover:text-blue-900"
          >
            Editar
          </button>
          <button
            onClick={() => onShowHistory(equipment)}
            className="text-green-600 hover:text-green-900"
          >
            Histórico
          </button>
          <button
            onClick={() => onDelete(equipment)}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-900 disabled:opacity-50"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
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

  const isAllSelected = equipamentos.length > 0 && selectedEquipments.length === equipamentos.length

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('numero_serie')}
            >
              Número Série
              {sortField === 'numero_serie' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('modelo')}
            >
              Modelo
              {sortField === 'modelo' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('fabricante')}
            >
              Fabricante
              {sortField === 'fabricante' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('status_equipamento')}
            >
              Status
              {sortField === 'status_equipamento' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('localizacao_atual')}
            >
              Localização
              {sortField === 'localizacao_atual' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Técnico Responsável
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Base Atendimento
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
