
import { EquipmentValidator } from './validators.ts';
import { DatabaseOperations } from './database.ts';
import { ProcessingContext, ProcessingResult, EquipmentImportData } from './types.ts';

export class EquipmentProcessor {
  private validator: EquipmentValidator;
  private database: DatabaseOperations;

  constructor(supabase: any) {
    this.validator = new EquipmentValidator();
    this.database = new DatabaseOperations(supabase);
  }

  async processImport(context: ProcessingContext): Promise<ProcessingResult> {
    let processedCount = 0;
    let errorCount = 0;

    console.log(`Iniciando processamento de ${context.csvData.length} registros`);

    for (let i = 0; i < context.csvData.length; i++) {
      const rowData = context.csvData[i];
      const lineNumber = i + 2; // Linha 1 é cabeçalho, então dados começam na linha 2

      try {
        await this.processRow(rowData, lineNumber, context.uploadId);
        processedCount++;
        
        if (processedCount % 100 === 0) {
          console.log(`Processados ${processedCount} registros...`);
        }
      } catch (error) {
        console.error(`Erro na linha ${lineNumber}:`, error);
        await this.database.logError(
          context.uploadId,
          lineNumber,
          error instanceof Error ? error.message : 'Erro desconhecido',
          rowData
        );
        errorCount++;
      }
    }

    const status = errorCount > 0 ? 'Processado com Erros' : 'Processado';
    await this.database.updateUploadStatus(context.uploadId, status, processedCount, errorCount);

    console.log(`Processamento concluído: ${processedCount} sucessos, ${errorCount} erros`);

    return {
      success: true,
      processed: processedCount,
      errors: errorCount,
      uploadId: context.uploadId
    };
  }

  private async processRow(rowData: any, lineNumber: number, uploadId: number): Promise<void> {
    // Validate row data
    const validatedData = this.validator.validateRow(rowData, lineNumber);
    if (!validatedData) {
      const errors = this.validator.getErrors();
      const errorMessage = errors.map(e => e.erro).join('; ');
      throw new Error(errorMessage);
    }

    // Check if equipment already exists
    const exists = await this.database.checkExistingEquipment(validatedData.numero_serie);
    if (exists) {
      throw new Error(`Equipamento com número de série ${validatedData.numero_serie} já existe`);
    }

    // Get equipment type ID if provided
    let tipoEquipamentoId = null;
    if (validatedData.tipo_equipamento) {
      tipoEquipamentoId = await this.database.getTipoEquipamentoId(validatedData.tipo_equipamento);
      if (!tipoEquipamentoId) {
        console.warn(`Tipo de equipamento '${validatedData.tipo_equipamento}' não encontrado para linha ${lineNumber}`);
      }
    }

    // Insert equipment
    await this.database.insertEquipment(validatedData, tipoEquipamentoId);
  }
}
