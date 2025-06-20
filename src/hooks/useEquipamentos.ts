
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Tables } from '@/integrations/supabase/types'

type Equipamento = Tables<'equipamento'>

export const useEquipamentos = () => {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEquipamentos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('equipamento')
        .select('*')
        .order('data_cadastro', { ascending: false })

      if (error) throw error
      setEquipamentos(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar equipamentos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEquipamentos()
  }, [])

  return {
    equipamentos,
    loading,
    error,
    refetch: fetchEquipamentos
  }
}
