
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Tables } from '@/integrations/supabase/types'

type Cliente = Tables<'cliente'>

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClientes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('cliente')
        .select('*')
        .order('data_cadastro', { ascending: false })

      if (error) throw error
      setClientes(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar clientes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  return {
    clientes,
    loading,
    error,
    refetch: fetchClientes
  }
}
