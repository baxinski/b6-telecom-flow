
import { EquipmentImportData, ValidationError, ProcessingContext } from './types.ts';

export class DatabaseOperations {
  private supabase: any;

  constructor(supabase: any) {
    this.supabase = supabase;
  }

  async checkExistingEquipment(numeroSerie: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('equipamento')
      .select('id_equipamento')
      .eq('numero_serie', numeroSerie)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Erro ao verificar equipamento existente: ${error.message}`);
    }

    return !!data;
  }

  async getTipoEquipamentoId(nome: string): Promise<number | null> {
    if (!nome) return null;

    const { data, error } = await this.supabase
      .from('tipo_equipamento')
      .select('id_tipo_equipamento')
      .eq('nome', nome)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Erro ao buscar tipo de equipamento: ${error.message}`);
    }

    return data?.id_tipo_equipamento || null;
  }

  async insertEquipment(equipmentData: EquipmentImportData, tipoEquipamentoId: number | null): Promise<void> {
    const insertData = {
      numero_serie: equipmentData.numero_serie,
      modelo: equipmentData.modelo,
      fabricante: equipmentData.fabricante,
      tipo_equipamento_id: tipoEquipamentoId,
      mac_address: equipmentData.mac_address,
      localizacao_atual: equipmentData.localizacao_atual,
      status_equipamento: equipmentData.status_equipamento,
      observacoes: equipmentData.observacoes,
      data_cadastro: new Date().toISOString()
    };

    const { error } = await this.supabase
      .from('equipamento')
      .insert(insertData);

    if (error) {
      throw new Error(`Erro ao inserir equipamento: ${error.message}`);
    }
  }

  async logError(uploadId: number, linha: number, erro: string, dados: any): Promise<void> {
    await this.supabase
      .from('log_importacao_equipamento')
      .insert({
        upload_id: uploadId,
        numero_serie: dados.numero_serie || null,
        linha_arquivo: linha,
        erro_descricao: erro,
        dados_linha: dados,
        data_erro: new Date().toISOString()
      });
  }

  async updateUploadStatus(uploadId: number, status: string, processed: number, errors: number): Promise<void> {
    const { error } = await this.supabase
      .from('upload_arquivo')
      .update({
        status_processamento: status,
        registros_processados: processed,
        registros_erro: errors,
        data_processamento: new Date().toISOString()
      })
      .eq('id_upload', uploadId);

    if (error) {
      throw new Error(`Erro ao atualizar status do upload: ${error.message}`);
    }
  }
}
