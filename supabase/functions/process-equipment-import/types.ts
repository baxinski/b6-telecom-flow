
export interface EquipmentImportData {
  numero_serie: string;
  modelo?: string;
  fabricante?: string;
  tipo_equipamento?: string;
  mac_address?: string;
  localizacao_atual?: string;
  status_equipamento?: string;
  observacoes?: string;
}

export interface ProcessingResult {
  success: boolean;
  processed: number;
  errors: number;
  uploadId: number;
}

export interface ValidationError {
  linha: number;
  erro: string;
  dados: any;
}

export interface ProcessingContext {
  uploadId: number;
  supabase: any;
  csvData: any[];
}
