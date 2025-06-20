
import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useTecnicos } from '@/hooks/useTecnicos'
import type { Tables } from '@/integrations/supabase/types'

type TipoEquipamento = Tables<'tipo_equipamento'>

interface EquipmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  equipment?: Tables<'equipamento'>
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  equipment
}) => {
  const { tecnicos } = useTecnicos()
  const [tiposEquipamento, setTiposEquipamento] = useState<TipoEquipamento[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    numero_serie: '',
    modelo: '',
    fabricante: '',
    tipo_equipamento_id: '',
    mac_address: '',
    status_equipamento: 'Em Estoque Central',
    localizacao_atual: 'Estoque Central',
    base_atendimento: '',
    tecnico_responsavel_id: '',
    observacoes: ''
  })

  useEffect(() => {
    const fetchTiposEquipamento = async () => {
      const { data } = await supabase
        .from('tipo_equipamento')
        .select('*')
        .order('nome')
      
      if (data) setTiposEquipamento(data)
    }

    if (isOpen) {
      fetchTiposEquipamento()
    }
  }, [isOpen])

  useEffect(() => {
    if (equipment) {
      setFormData({
        numero_serie: equipment.numero_serie || '',
        modelo: equipment.modelo || '',
        fabricante: equipment.fabricante || '',
        tipo_equipamento_id: equipment.tipo_equipamento_id?.toString() || '',
        mac_address: equipment.mac_address || '',
        status_equipamento: equipment.status_equipamento || 'Em Estoque Central',
        localizacao_atual: equipment.localizacao_atual || 'Estoque Central',
        base_atendimento: equipment.base_atendimento || '',
        tecnico_responsavel_id: equipment.tecnico_responsavel_id?.toString() || '',
        observacoes: equipment.observacoes || ''
      })
    }
  }, [equipment])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const equipmentData = {
        numero_serie: formData.numero_serie,
        modelo: formData.modelo || null,
        fabricante: formData.fabricante || null,
        tipo_equipamento_id: parseInt(formData.tipo_equipamento_id),
        mac_address: formData.mac_address || null,
        status_equipamento: formData.status_equipamento,
        localizacao_atual: formData.localizacao_atual,
        base_atendimento: formData.base_atendimento || null,
        tecnico_responsavel_id: formData.tecnico_responsavel_id ? parseInt(formData.tecnico_responsavel_id) : null,
        observacoes: formData.observacoes || null
      }

      if (equipment) {
        const { error } = await supabase
          .from('equipamento')
          .update(equipmentData)
          .eq('id_equipamento', equipment.id_equipamento)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('equipamento')
          .insert([equipmentData])
        
        if (error) throw error
      }

      onSave()
      onClose()
      
      // Reset form
      setFormData({
        numero_serie: '',
        modelo: '',
        fabricante: '',
        tipo_equipamento_id: '',
        mac_address: '',
        status_equipamento: 'Em Estoque Central',
        localizacao_atual: 'Estoque Central',
        base_atendimento: '',
        tecnico_responsavel_id: '',
        observacoes: ''
      })
    } catch (error) {
      console.error('Erro ao salvar equipamento:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {equipment ? 'Editar Equipamento' : 'Novo Equipamento'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Série *
              </label>
              <input
                type="text"
                required
                value={formData.numero_serie}
                onChange={(e) => setFormData({ ...formData, numero_serie: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ex: ABC123456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Equipamento *
              </label>
              <select
                required
                value={formData.tipo_equipamento_id}
                onChange={(e) => setFormData({ ...formData, tipo_equipamento_id: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Selecione o tipo</option>
                {tiposEquipamento.map(tipo => (
                  <option key={tipo.id_tipo_equipamento} value={tipo.id_tipo_equipamento}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo
              </label>
              <input
                type="text"
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ex: Router AC1200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fabricante
              </label>
              <input
                type="text"
                value={formData.fabricante}
                onChange={(e) => setFormData({ ...formData, fabricante: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ex: TP-Link"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MAC Address
              </label>
              <input
                type="text"
                value={formData.mac_address}
                onChange={(e) => setFormData({ ...formData, mac_address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ex: 00:11:22:33:44:55"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status_equipamento}
                onChange={(e) => setFormData({ ...formData, status_equipamento: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="Em Estoque Central">Em Estoque Central</option>
                <option value="Com Técnico">Com Técnico</option>
                <option value="Instalado">Instalado</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Defeituoso">Defeituoso</option>
                <option value="Usado">Usado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localização Atual
              </label>
              <input
                type="text"
                value={formData.localizacao_atual}
                onChange={(e) => setFormData({ ...formData, localizacao_atual: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ex: Estoque Central"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base de Atendimento
              </label>
              <input
                type="text"
                value={formData.base_atendimento}
                onChange={(e) => setFormData({ ...formData, base_atendimento: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ex: São Paulo"
              />
            </div>

            {(formData.status_equipamento === 'Com Técnico' || formData.status_equipamento === 'Instalado') && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Técnico Responsável
                </label>
                <select
                  value={formData.tecnico_responsavel_id}
                  onChange={(e) => setFormData({ ...formData, tecnico_responsavel_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Selecione um técnico</option>
                  {tecnicos.map(tecnico => (
                    <option key={tecnico.id_tecnico} value={tecnico.id_tecnico}>
                      {tecnico.nome_completo}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Observações adicionais sobre o equipamento..."
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {loading ? 'Salvando...' : equipment ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EquipmentModal
