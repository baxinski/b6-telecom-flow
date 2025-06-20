
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Tables } from '@/integrations/supabase/types'

type Tecnico = Tables<'tecnico'>

export const useTecnicos = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTecnicos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tecnico')
        .select('*')
        .order('nome_completo', { ascending: true })

      if (error) throw error
      setTecnicos(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar técnicos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTecnicos()
  }, [])

  return {
    tecnicos,
    loading,
    error,
    refetch: fetchTecnicos
  }
}
