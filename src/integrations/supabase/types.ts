export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      auditoria_equipamento: {
        Row: {
          dados_anteriores: Json | null
          dados_novos: Json | null
          data_operacao: string
          detalhes: string | null
          equipamento_id: number
          id_auditoria: number
          ip_usuario: string | null
          operacao: string
          usuario_id: string | null
        }
        Insert: {
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          data_operacao?: string
          detalhes?: string | null
          equipamento_id: number
          id_auditoria?: number
          ip_usuario?: string | null
          operacao: string
          usuario_id?: string | null
        }
        Update: {
          dados_anteriores?: Json | null
          dados_novos?: Json | null
          data_operacao?: string
          detalhes?: string | null
          equipamento_id?: number
          id_auditoria?: number
          ip_usuario?: string | null
          operacao?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auditoria_equipamento_equipamento_id_fkey"
            columns: ["equipamento_id"]
            isOneToOne: false
            referencedRelation: "equipamento"
            referencedColumns: ["id_equipamento"]
          },
        ]
      }
      cliente: {
        Row: {
          cep_cliente: string | null
          cidade_cliente: string | null
          contato_principal_email: string | null
          contato_principal_nome: string | null
          contato_principal_telefone: string | null
          data_cadastro: string
          documento_cliente: string | null
          endereco_cliente: string | null
          estado_cliente: string | null
          id_cliente: number
          nome_cliente: string
          telefone_celular: string | null
          telefone_fixo: string | null
        }
        Insert: {
          cep_cliente?: string | null
          cidade_cliente?: string | null
          contato_principal_email?: string | null
          contato_principal_nome?: string | null
          contato_principal_telefone?: string | null
          data_cadastro?: string
          documento_cliente?: string | null
          endereco_cliente?: string | null
          estado_cliente?: string | null
          id_cliente?: number
          nome_cliente: string
          telefone_celular?: string | null
          telefone_fixo?: string | null
        }
        Update: {
          cep_cliente?: string | null
          cidade_cliente?: string | null
          contato_principal_email?: string | null
          contato_principal_nome?: string | null
          contato_principal_telefone?: string | null
          data_cadastro?: string
          documento_cliente?: string | null
          endereco_cliente?: string | null
          estado_cliente?: string | null
          id_cliente?: number
          nome_cliente?: string
          telefone_celular?: string | null
          telefone_fixo?: string | null
        }
        Relationships: []
      }
      devolucao: {
        Row: {
          data_aml: string | null
          data_cadastro: string | null
          data_mobwire: string | null
          destino: string
          id_devolucao: number
          motivo: string | null
          observacao: string | null
          serial: string
          tecnico_id: number | null
        }
        Insert: {
          data_aml?: string | null
          data_cadastro?: string | null
          data_mobwire?: string | null
          destino: string
          id_devolucao?: never
          motivo?: string | null
          observacao?: string | null
          serial: string
          tecnico_id?: number | null
        }
        Update: {
          data_aml?: string | null
          data_cadastro?: string | null
          data_mobwire?: string | null
          destino?: string
          id_devolucao?: never
          motivo?: string | null
          observacao?: string | null
          serial?: string
          tecnico_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "devolucao_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnico"
            referencedColumns: ["id_tecnico"]
          },
        ]
      }
      equipamento: {
        Row: {
          base_atendimento: string | null
          cliente_instalado_id: number | null
          codigo_barras: string | null
          data_cadastro: string
          data_entrada_estoque_central: string | null
          data_saida_estoque_central: string | null
          fabricante: string | null
          id_equipamento: number
          localizacao_atual: string
          mac_address: string | null
          modelo: string | null
          numero_serie: string
          observacoes: string | null
          os_instalacao_id: number | null
          status_equipamento: string
          tecnico_responsavel_id: number | null
          tipo_equipamento_id: number
        }
        Insert: {
          base_atendimento?: string | null
          cliente_instalado_id?: number | null
          codigo_barras?: string | null
          data_cadastro?: string
          data_entrada_estoque_central?: string | null
          data_saida_estoque_central?: string | null
          fabricante?: string | null
          id_equipamento?: number
          localizacao_atual: string
          mac_address?: string | null
          modelo?: string | null
          numero_serie: string
          observacoes?: string | null
          os_instalacao_id?: number | null
          status_equipamento?: string
          tecnico_responsavel_id?: number | null
          tipo_equipamento_id: number
        }
        Update: {
          base_atendimento?: string | null
          cliente_instalado_id?: number | null
          codigo_barras?: string | null
          data_cadastro?: string
          data_entrada_estoque_central?: string | null
          data_saida_estoque_central?: string | null
          fabricante?: string | null
          id_equipamento?: number
          localizacao_atual?: string
          mac_address?: string | null
          modelo?: string | null
          numero_serie?: string
          observacoes?: string | null
          os_instalacao_id?: number | null
          status_equipamento?: string
          tecnico_responsavel_id?: number | null
          tipo_equipamento_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "equipamento_cliente_instalado_id_fkey"
            columns: ["cliente_instalado_id"]
            isOneToOne: false
            referencedRelation: "cliente"
            referencedColumns: ["id_cliente"]
          },
          {
            foreignKeyName: "equipamento_tecnico_responsavel_id_fkey"
            columns: ["tecnico_responsavel_id"]
            isOneToOne: false
            referencedRelation: "tecnico"
            referencedColumns: ["id_tecnico"]
          },
          {
            foreignKeyName: "equipamento_tipo_equipamento_id_fkey"
            columns: ["tipo_equipamento_id"]
            isOneToOne: false
            referencedRelation: "tipo_equipamento"
            referencedColumns: ["id_tipo_equipamento"]
          },
          {
            foreignKeyName: "fk_equipamento_os_instalacao"
            columns: ["os_instalacao_id"]
            isOneToOne: false
            referencedRelation: "ordem_servico"
            referencedColumns: ["id_os"]
          },
        ]
      }
      equipamento_serial_tracking: {
        Row: {
          data_registro: string | null
          id_tracking: number
          observacoes: string | null
          sn_01: string
        }
        Insert: {
          data_registro?: string | null
          id_tracking?: never
          observacoes?: string | null
          sn_01: string
        }
        Update: {
          data_registro?: string | null
          id_tracking?: never
          observacoes?: string | null
          sn_01?: string
        }
        Relationships: []
      }
      historico_os: {
        Row: {
          data_hora: string | null
          descricao_alteracao: string
          id_historico_os: number
          os_id: number
          usuario_id: string | null
        }
        Insert: {
          data_hora?: string | null
          descricao_alteracao: string
          id_historico_os?: number
          os_id: number
          usuario_id?: string | null
        }
        Update: {
          data_hora?: string | null
          descricao_alteracao?: string
          id_historico_os?: number
          os_id?: number
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historico_os_os_id_fkey"
            columns: ["os_id"]
            isOneToOne: false
            referencedRelation: "ordem_servico"
            referencedColumns: ["id_os"]
          },
        ]
      }
      log_importacao_equipamento: {
        Row: {
          dados_linha: Json | null
          data_erro: string | null
          erro_descricao: string | null
          id_log: number
          linha_arquivo: number | null
          numero_serie: string | null
          upload_id: number | null
        }
        Insert: {
          dados_linha?: Json | null
          data_erro?: string | null
          erro_descricao?: string | null
          id_log?: number
          linha_arquivo?: number | null
          numero_serie?: string | null
          upload_id?: number | null
        }
        Update: {
          dados_linha?: Json | null
          data_erro?: string | null
          erro_descricao?: string | null
          id_log?: number
          linha_arquivo?: number | null
          numero_serie?: string | null
          upload_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "log_importacao_equipamento_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "upload_arquivo"
            referencedColumns: ["id_upload"]
          },
        ]
      }
      modelo_equipamento: {
        Row: {
          fabricante: string
          id_modelo: number
          nome: string
          observacao: string | null
          wifi_padrao: string | null
        }
        Insert: {
          fabricante: string
          id_modelo?: never
          nome: string
          observacao?: string | null
          wifi_padrao?: string | null
        }
        Update: {
          fabricante?: string
          id_modelo?: never
          nome?: string
          observacao?: string | null
          wifi_padrao?: string | null
        }
        Relationships: []
      }
      movimentacao_equip: {
        Row: {
          confirmacao: string | null
          data_cadastro: string | null
          data_entrada: string | null
          data_saida: string | null
          flag_proc: boolean | null
          id_movimentacao: number
          mes_referencia: string | null
          modelo_id: number | null
          observacao: string | null
          serial: string
          serial_me: string | null
          serial_preventiva: string | null
          status_movimentacao: string
          tecnico_id: number | null
          tipo_movimentacao: string | null
        }
        Insert: {
          confirmacao?: string | null
          data_cadastro?: string | null
          data_entrada?: string | null
          data_saida?: string | null
          flag_proc?: boolean | null
          id_movimentacao?: never
          mes_referencia?: string | null
          modelo_id?: number | null
          observacao?: string | null
          serial: string
          serial_me?: string | null
          serial_preventiva?: string | null
          status_movimentacao?: string
          tecnico_id?: number | null
          tipo_movimentacao?: string | null
        }
        Update: {
          confirmacao?: string | null
          data_cadastro?: string | null
          data_entrada?: string | null
          data_saida?: string | null
          flag_proc?: boolean | null
          id_movimentacao?: never
          mes_referencia?: string | null
          modelo_id?: number | null
          observacao?: string | null
          serial?: string
          serial_me?: string | null
          serial_preventiva?: string | null
          status_movimentacao?: string
          tecnico_id?: number | null
          tipo_movimentacao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentacao_equip_modelo_id_fkey"
            columns: ["modelo_id"]
            isOneToOne: false
            referencedRelation: "modelo_equipamento"
            referencedColumns: ["id_modelo"]
          },
          {
            foreignKeyName: "movimentacao_equip_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnico"
            referencedColumns: ["id_tecnico"]
          },
        ]
      }
      movimentacao_equipamento: {
        Row: {
          data_movimentacao: string
          destino_descricao: string | null
          destino_id: number | null
          destino_tipo: string | null
          equipamento_id: number
          id_movimentacao: number
          observacao: string | null
          origem_descricao: string | null
          origem_id: number | null
          origem_tipo: string | null
          os_id: number | null
          tipo_movimentacao: string
          usuario_id: string | null
        }
        Insert: {
          data_movimentacao?: string
          destino_descricao?: string | null
          destino_id?: number | null
          destino_tipo?: string | null
          equipamento_id: number
          id_movimentacao?: number
          observacao?: string | null
          origem_descricao?: string | null
          origem_id?: number | null
          origem_tipo?: string | null
          os_id?: number | null
          tipo_movimentacao: string
          usuario_id?: string | null
        }
        Update: {
          data_movimentacao?: string
          destino_descricao?: string | null
          destino_id?: number | null
          destino_tipo?: string | null
          equipamento_id?: number
          id_movimentacao?: number
          observacao?: string | null
          origem_descricao?: string | null
          origem_id?: number | null
          origem_tipo?: string | null
          os_id?: number | null
          tipo_movimentacao?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentacao_equipamento_equipamento_id_fkey"
            columns: ["equipamento_id"]
            isOneToOne: false
            referencedRelation: "equipamento"
            referencedColumns: ["id_equipamento"]
          },
          {
            foreignKeyName: "movimentacao_equipamento_os_id_fkey"
            columns: ["os_id"]
            isOneToOne: false
            referencedRelation: "ordem_servico"
            referencedColumns: ["id_os"]
          },
        ]
      }
      ordem_servico: {
        Row: {
          acao: string | null
          area_trabalho: string | null
          assinatura_cliente_url: string | null
          chave_workzone: string | null
          cliente_id: number
          codigo_item: string | null
          consumo_sap: string | null
          contato_cliente_os: string | null
          contrato: string | null
          data_abertura: string
          data_agendamento: string | null
          data_conclusao: string | null
          descricao_problema: string | null
          doc_sap: string | null
          endereco_cliente_os: string | null
          esboço: string | null
          foto_evidencia_antes_url: string | null
          foto_evidencia_depois_url: string | null
          habilidade: string | null
          id_os: number
          motivo_encerramento: string | null
          nome_cliente_os: string | null
          numero_cliente: string | null
          observacoes_tecnico: string | null
          posicao_rota: number | null
          protocolo: string | null
          status_os: string
          tecnico_atribuido_id: number | null
          tipo_servico_id: number
          turno: string | null
          usuario_abertura_id: string | null
        }
        Insert: {
          acao?: string | null
          area_trabalho?: string | null
          assinatura_cliente_url?: string | null
          chave_workzone?: string | null
          cliente_id: number
          codigo_item?: string | null
          consumo_sap?: string | null
          contato_cliente_os?: string | null
          contrato?: string | null
          data_abertura?: string
          data_agendamento?: string | null
          data_conclusao?: string | null
          descricao_problema?: string | null
          doc_sap?: string | null
          endereco_cliente_os?: string | null
          esboço?: string | null
          foto_evidencia_antes_url?: string | null
          foto_evidencia_depois_url?: string | null
          habilidade?: string | null
          id_os?: number
          motivo_encerramento?: string | null
          nome_cliente_os?: string | null
          numero_cliente?: string | null
          observacoes_tecnico?: string | null
          posicao_rota?: number | null
          protocolo?: string | null
          status_os?: string
          tecnico_atribuido_id?: number | null
          tipo_servico_id: number
          turno?: string | null
          usuario_abertura_id?: string | null
        }
        Update: {
          acao?: string | null
          area_trabalho?: string | null
          assinatura_cliente_url?: string | null
          chave_workzone?: string | null
          cliente_id?: number
          codigo_item?: string | null
          consumo_sap?: string | null
          contato_cliente_os?: string | null
          contrato?: string | null
          data_abertura?: string
          data_agendamento?: string | null
          data_conclusao?: string | null
          descricao_problema?: string | null
          doc_sap?: string | null
          endereco_cliente_os?: string | null
          esboço?: string | null
          foto_evidencia_antes_url?: string | null
          foto_evidencia_depois_url?: string | null
          habilidade?: string | null
          id_os?: number
          motivo_encerramento?: string | null
          nome_cliente_os?: string | null
          numero_cliente?: string | null
          observacoes_tecnico?: string | null
          posicao_rota?: number | null
          protocolo?: string | null
          status_os?: string
          tecnico_atribuido_id?: number | null
          tipo_servico_id?: number
          turno?: string | null
          usuario_abertura_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ordem_servico_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "cliente"
            referencedColumns: ["id_cliente"]
          },
          {
            foreignKeyName: "ordem_servico_tecnico_atribuido_id_fkey"
            columns: ["tecnico_atribuido_id"]
            isOneToOne: false
            referencedRelation: "tecnico"
            referencedColumns: ["id_tecnico"]
          },
          {
            foreignKeyName: "ordem_servico_tipo_servico_id_fkey"
            columns: ["tipo_servico_id"]
            isOneToOne: false
            referencedRelation: "tipo_servico"
            referencedColumns: ["id_tipo_servico"]
          },
        ]
      }
      perfis_usuarios: {
        Row: {
          data_criacao_perfil: string | null
          id: string
          tipo_usuario: string
        }
        Insert: {
          data_criacao_perfil?: string | null
          id: string
          tipo_usuario?: string
        }
        Update: {
          data_criacao_perfil?: string | null
          id?: string
          tipo_usuario?: string
        }
        Relationships: []
      }
      protocolo_justificativa: {
        Row: {
          data_cadastro: string | null
          id_protocolo: number
          justificativa: string | null
          protocolo: string
        }
        Insert: {
          data_cadastro?: string | null
          id_protocolo?: never
          justificativa?: string | null
          protocolo: string
        }
        Update: {
          data_cadastro?: string | null
          id_protocolo?: never
          justificativa?: string | null
          protocolo?: string
        }
        Relationships: []
      }
      servico_manual: {
        Row: {
          codigos_especificos: string | null
          data_cadastro: string | null
          data_execucao: string | null
          detalhes_tecnicos: string | null
          equipamentos_instalados: string | null
          id_servico_manual: number
          os_id: number | null
          recurso_tecnico: string | null
        }
        Insert: {
          codigos_especificos?: string | null
          data_cadastro?: string | null
          data_execucao?: string | null
          detalhes_tecnicos?: string | null
          equipamentos_instalados?: string | null
          id_servico_manual?: never
          os_id?: number | null
          recurso_tecnico?: string | null
        }
        Update: {
          codigos_especificos?: string | null
          data_cadastro?: string | null
          data_execucao?: string | null
          detalhes_tecnicos?: string | null
          equipamentos_instalados?: string | null
          id_servico_manual?: never
          os_id?: number | null
          recurso_tecnico?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "servico_manual_os_id_fkey"
            columns: ["os_id"]
            isOneToOne: false
            referencedRelation: "ordem_servico"
            referencedColumns: ["id_os"]
          },
        ]
      }
      tecnico: {
        Row: {
          base_atendimento: string | null
          contato_email: string | null
          contato_telefone: string | null
          data_cadastro: string
          id_tecnico: number
          matricula: string
          nome_completo: string
          status_tecnico: string
          usuario_id: string | null
        }
        Insert: {
          base_atendimento?: string | null
          contato_email?: string | null
          contato_telefone?: string | null
          data_cadastro?: string
          id_tecnico?: number
          matricula: string
          nome_completo: string
          status_tecnico?: string
          usuario_id?: string | null
        }
        Update: {
          base_atendimento?: string | null
          contato_email?: string | null
          contato_telefone?: string | null
          data_cadastro?: string
          id_tecnico?: number
          matricula?: string
          nome_completo?: string
          status_tecnico?: string
          usuario_id?: string | null
        }
        Relationships: []
      }
      tipo_equipamento: {
        Row: {
          descricao: string | null
          id_tipo_equipamento: number
          nome: string
        }
        Insert: {
          descricao?: string | null
          id_tipo_equipamento?: number
          nome: string
        }
        Update: {
          descricao?: string | null
          id_tipo_equipamento?: number
          nome?: string
        }
        Relationships: []
      }
      tipo_servico: {
        Row: {
          descricao: string | null
          id_tipo_servico: number
          nome: string
        }
        Insert: {
          descricao?: string | null
          id_tipo_servico?: number
          nome: string
        }
        Update: {
          descricao?: string | null
          id_tipo_servico?: number
          nome?: string
        }
        Relationships: []
      }
      upload_arquivo: {
        Row: {
          caminho_arquivo: string
          data_processamento: string | null
          data_upload: string | null
          id_upload: number
          nome_arquivo: string
          observacoes: string | null
          registros_erro: number | null
          registros_processados: number | null
          status_processamento: string | null
          tamanho_arquivo: number
          tipo_arquivo: string
          total_registros: number | null
          usuario_upload: string | null
        }
        Insert: {
          caminho_arquivo: string
          data_processamento?: string | null
          data_upload?: string | null
          id_upload?: number
          nome_arquivo: string
          observacoes?: string | null
          registros_erro?: number | null
          registros_processados?: number | null
          status_processamento?: string | null
          tamanho_arquivo: number
          tipo_arquivo: string
          total_registros?: number | null
          usuario_upload?: string | null
        }
        Update: {
          caminho_arquivo?: string
          data_processamento?: string | null
          data_upload?: string | null
          id_upload?: number
          nome_arquivo?: string
          observacoes?: string | null
          registros_erro?: number | null
          registros_processados?: number | null
          status_processamento?: string | null
          tamanho_arquivo?: number
          tipo_arquivo?: string
          total_registros?: number | null
          usuario_upload?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      vw_devolucoes_pendentes: {
        Row: {
          data_cadastro: string | null
          destino: string | null
          modelo: string | null
          motivo: string | null
          serial: string | null
          tecnico: string | null
        }
        Relationships: []
      }
      vw_instalacoes_mes: {
        Row: {
          fabricante: string | null
          mes_referencia: string | null
          modelo: string | null
          total_instalacoes: number | null
        }
        Relationships: []
      }
      vw_inventario_atual: {
        Row: {
          modelo: string | null
          quantidade: number | null
          status: string | null
          tecnico: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_cliente_nome_por_id: {
        Args: { cliente_id: number }
        Returns: string
      }
      get_tecnico_nome_por_id: {
        Args: { tecnico_id: number }
        Returns: string
      }
      get_usuario_nome: {
        Args: { user_id: string }
        Returns: string
      }
      is_admin: {
        Args: { p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
