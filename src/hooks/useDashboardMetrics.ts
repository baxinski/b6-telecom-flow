
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface DashboardMetrics {
  totalEquipamentos: number
  osConcluidas: number
  osPendentes: number
  equipamentosAtivos: number
  equipamentosEstoque: number
  equipamentosManutencao: number
  tecnicosAtivos: number
}

export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalEquipamentos: 0,
    osConcluidas: 0,
    osPendentes: 0,
    equipamentosAtivos: 0,
    equipamentosEstoque: 0,
    equipamentosManutencao: 0,
    tecnicosAtivos: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      
      // Buscar total de equipamentos
      const { count: totalEquipamentos } = await supabase
        .from('equipamento')
        .select('*', { count: 'exact', head: true })

      // Buscar OS concluídas
      const { count: osConcluidas } = await supabase
        .from('ordem_servico')
        .select('*', { count: 'exact', head: true })
        .eq('status_os', 'Concluída')

      // Buscar OS pendentes
      const { count: osPendentes } = await supabase
        .from('ordem_servico')
        .select('*', { count: 'exact', head: true })
        .in('status_os', ['Aberta', 'Em Andamento'])

      // Buscar equipamentos por status
      const { data: equipamentosPorStatus } = await supabase
        .from('equipamento')
        .select('status_equipamento')

      // Buscar técnicos ativos
      const { count: tecnicosAtivos } = await supabase
        .from('tecnico')
        .select('*', { count: 'exact', head: true })
        .eq('status_tecnico', 'Ativo')

      // Calcular distribuição de equipamentos
      const equipamentosAtivos = equipamentosPorStatus?.filter(e => 
        e.status_equipamento === 'Instalado' || e.status_equipamento === 'Em Uso'
      ).length || 0

      const equipamentosEstoque = equipamentosPorStatus?.filter(e => 
        e.status_equipamento === 'Em Estoque Central'
      ).length || 0

      const equipamentosManutencao = equipamentosPorStatus?.filter(e => 
        e.status_equipamento === 'Em Manutenção'
      ).length || 0

      setMetrics({
        totalEquipamentos: totalEquipamentos || 0,
        osConcluidas: osConcluidas || 0,
        osPendentes: osPendentes || 0,
        equipamentosAtivos,
        equipamentosEstoque,
        equipamentosManutencao,
        tecnicosAtivos: tecnicosAtivos || 0
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar métricas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics
  }
}
