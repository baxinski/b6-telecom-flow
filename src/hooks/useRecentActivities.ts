
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface RecentActivity {
  id: string
  type: 'os' | 'movimentacao' | 'equipamento'
  title: string
  description: string
  timestamp: string
  user?: string
}

export const useRecentActivities = () => {
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActivities = async () => {
    try {
      setLoading(true)
      
      // Buscar últimas OS criadas
      const { data: recentOS } = await supabase
        .from('ordem_servico')
        .select('id_os, nome_cliente_os, data_abertura, status_os')
        .order('data_abertura', { ascending: false })
        .limit(5)

      // Buscar últimas movimentações
      const { data: recentMovimentacoes } = await supabase
        .from('historico_movimentacao_equipamento')
        .select('id_historico, tipo_movimentacao, data_movimentacao, equipamento_id')
        .order('data_movimentacao', { ascending: false })
        .limit(5)

      // Buscar últimos equipamentos cadastrados
      const { data: recentEquipamentos } = await supabase
        .from('equipamento')
        .select('id_equipamento, numero_serie, data_cadastro, status_equipamento')
        .order('data_cadastro', { ascending: false })
        .limit(3)

      const allActivities: RecentActivity[] = []

      // Processar OS
      recentOS?.forEach(os => {
        allActivities.push({
          id: `os-${os.id_os}`,
          type: 'os',
          title: 'Nova Ordem de Serviço',
          description: `OS para ${os.nome_cliente_os || 'Cliente não informado'} - Status: ${os.status_os}`,
          timestamp: os.data_abertura
        })
      })

      // Processar movimentações
      recentMovimentacoes?.forEach(mov => {
        allActivities.push({
          id: `mov-${mov.id_historico}`,
          type: 'movimentacao',
          title: 'Movimentação de Equipamento',
          description: `${mov.tipo_movimentacao} - Equipamento ID: ${mov.equipamento_id}`,
          timestamp: mov.data_movimentacao
        })
      })

      // Processar equipamentos
      recentEquipamentos?.forEach(eq => {
        allActivities.push({
          id: `eq-${eq.id_equipamento}`,
          type: 'equipamento',
          title: 'Novo Equipamento Cadastrado',
          description: `${eq.numero_serie} - Status: ${eq.status_equipamento}`,
          timestamp: eq.data_cadastro
        })
      })

      // Ordenar por timestamp e pegar os 10 mais recentes
      const sortedActivities = allActivities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10)

      setActivities(sortedActivities)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar atividades')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities
  }
}
