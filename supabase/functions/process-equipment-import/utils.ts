
import Papa from 'https://esm.sh/papaparse@5.4.1';

export class FileUtils {
  static async parseCSV(fileContent: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        encoding: 'UTF-8',
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(`Erro ao analisar CSV: ${results.errors[0].message}`));
          } else {
            resolve(results.data);
          }
        },
        error: (error) => {
          reject(new Error(`Erro ao analisar CSV: ${error.message}`));
        }
      });
    });
  }

  static validateFileSize(content: string, maxSizeMB: number = 10): void {
    const sizeInMB = (content.length * 2) / (1024 * 1024); // Rough estimation
    if (sizeInMB > maxSizeMB) {
      throw new Error(`Arquivo muito grande. Tamanho máximo permitido: ${maxSizeMB}MB`);
    }
  }
}

export class ResponseUtils {
  static createErrorResponse(message: string, status: number = 400): Response {
    return new Response(
      JSON.stringify({ error: message }),
      {
        status,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  static createSuccessResponse(data: any): Response {
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
