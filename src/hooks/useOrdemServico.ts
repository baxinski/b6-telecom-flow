
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Tables } from '@/integrations/supabase/types'

type OrdemServico = Tables<'ordem_servico'>

export const useOrdemServico = () => {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrdensServico = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('ordem_servico')
        .select('*')
        .order('data_abertura', { ascending: false })

      if (error) throw error
      setOrdensServico(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar ordens de serviço')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrdensServico()
  }, [])

  return {
    ordensServico,
    loading,
    error,
    refetch: fetchOrdensServico
  }
}
