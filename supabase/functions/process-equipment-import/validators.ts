
import { EquipmentImportData, ValidationError } from './types.ts';

export class EquipmentValidator {
  private errors: ValidationError[] = [];

  validateRow(rowData: any, lineNumber: number): EquipmentImportData | null {
    this.errors = [];

    // Required field validation
    if (!rowData.numero_serie || rowData.numero_serie.trim() === '') {
      this.addError(lineNumber, 'Número de série é obrigatório', rowData);
      return null;
    }

    // Serial number format validation
    if (typeof rowData.numero_serie !== 'string' || rowData.numero_serie.length > 50) {
      this.addError(lineNumber, 'Número de série deve ser uma string com até 50 caracteres', rowData);
      return null;
    }

    // MAC address validation (if provided)
    if (rowData.mac_address && !this.isValidMacAddress(rowData.mac_address)) {
      this.addError(lineNumber, 'Formato de MAC address inválido', rowData);
      return null;
    }

    // Status validation
    const validStatuses = ['Em Estoque Central', 'Com Técnico', 'Instalado', 'Defeituoso', 'Devolvido'];
    if (rowData.status_equipamento && !validStatuses.includes(rowData.status_equipamento)) {
      this.addError(lineNumber, `Status inválido. Valores permitidos: ${validStatuses.join(', ')}`, rowData);
      return null;
    }

    return {
      numero_serie: rowData.numero_serie.trim(),
      modelo: rowData.modelo?.trim(),
      fabricante: rowData.fabricante?.trim(),
      tipo_equipamento: rowData.tipo_equipamento?.trim(),
      mac_address: rowData.mac_address?.trim(),
      localizacao_atual: rowData.localizacao_atual?.trim() || 'Estoque Central',
      status_equipamento: rowData.status_equipamento?.trim() || 'Em Estoque Central',
      observacoes: rowData.observacoes?.trim()
    };
  }

  private isValidMacAddress(mac: string): boolean {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
  }

  private addError(linha: number, erro: string, dados: any): void {
    this.errors.push({ linha, erro, dados });
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }
}
