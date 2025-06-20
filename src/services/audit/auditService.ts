
import { supabase } from '@/integrations/supabase/client'

export interface AuditLog {
  id_auditoria: number
  equipamento_id: number
  operacao: 'CREATE' | 'UPDATE' | 'DELETE'
  dados_anteriores: any
  dados_novos: any
  data_operacao: string
  usuario_id: string
  usuario_nome: string
  detalhes: string
  ip_usuario: string
}

export const auditService = {
  async getEquipmentAuditLogs(equipamentoId: number): Promise<AuditLog[]> {
    const { data, error } = await supabase
      .from('auditoria_equipamento')
      .select(`
        id_auditoria,
        equipamento_id,
        operacao,
        dados_anteriores,
        dados_novos,
        data_operacao,
        usuario_id,
        detalhes,
        ip_usuario
      `)
      .eq('equipamento_id', equipamentoId)
      .order('data_operacao', { ascending: false })

    if (error) {
      console.error('Erro ao buscar logs de auditoria:', error)
      throw error
    }

    // Type cast the response to match our interface
    return (data || []).map(log => ({
      ...log,
      operacao: log.operacao as 'CREATE' | 'UPDATE' | 'DELETE',
      usuario_nome: 'Sistema', // Default value since we don't have user names in the current schema
      data_operacao: log.data_operacao || '',
      usuario_id: log.usuario_id || '',
      detalhes: log.detalhes || '',
      ip_usuario: log.ip_usuario || ''
    }))
  },

  async createAuditLog(auditData: {
    equipamento_id: number
    operacao: 'CREATE' | 'UPDATE' | 'DELETE'
    dados_anteriores?: any
    dados_novos?: any
    detalhes?: string
    usuario_id?: string
    ip_usuario?: string
  }): Promise<void> {
    const { error } = await supabase
      .from('auditoria_equipamento')
      .insert([auditData])

    if (error) {
      console.error('Erro ao criar log de auditoria:', error)
      throw error
    }
  }
}
