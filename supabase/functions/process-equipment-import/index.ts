
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { EquipmentProcessor } from './processor.ts';
import { FileUtils, ResponseUtils } from './utils.ts';
import { ProcessingContext } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Iniciando processamento de importação de equipamentos');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const { uploadId, fileContent } = await req.json();
    
    if (!uploadId || !fileContent) {
      return ResponseUtils.createErrorResponse('uploadId e fileContent são obrigatórios');
    }

    console.log(`Processando upload ID: ${uploadId}`);

    // Validate file size
    FileUtils.validateFileSize(fileContent);

    // Parse CSV content
    const csvData = await FileUtils.parseCSV(fileContent);
    
    if (csvData.length === 0) {
      return ResponseUtils.createErrorResponse('Arquivo CSV está vazio ou não contém dados válidos');
    }

    console.log(`CSV analisado com sucesso: ${csvData.length} registros encontrados`);

    // Create processing context
    const context: ProcessingContext = {
      uploadId,
      supabase,
      csvData
    };

    // Process the import
    const processor = new EquipmentProcessor(supabase);
    const result = await processor.processImport(context);

    return ResponseUtils.createSuccessResponse({
      message: 'Importação processada com sucesso',
      ...result
    });

  } catch (error) {
    console.error('Erro durante o processamento:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Erro interno do servidor';
    
    return ResponseUtils.createErrorResponse(errorMessage, 500);
  }
});
