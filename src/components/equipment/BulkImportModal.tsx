
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

export const BulkImportModal: React.FC<BulkImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: number;
    errors: number;
    total: number;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setUploadResult(null);
    } else {
      alert('Por favor, selecione um arquivo CSV válido.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Call the Supabase Edge Function for processing CSV
      const { data, error } = await supabase.functions.invoke('process-equipment-import', {
        body: formData
      });

      if (error) {
        console.error('Error uploading file:', error);
        alert('Erro ao processar arquivo: ' + error.message);
        return;
      }

      if (data) {
        setUploadResult({
          success: data.processed || 0,
          errors: data.errors || 0,
          total: data.processed + data.errors || 0
        });
        
        if (data.processed > 0) {
          onImportComplete();
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Erro ao fazer upload do arquivo.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetModal = () => {
    setFile(null);
    setUploadResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Importação em Massa de Equipamentos</h2>
        
        {!uploadResult ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Selecionar arquivo CSV:
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Formato esperado do CSV:</p>
              <p>numero_serie, modelo, fabricante, tipo_equipamento, mac_address, observacoes</p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleUpload} 
                disabled={!file || isUploading}
                className="flex-1"
              >
                {isUploading ? 'Processando...' : 'Importar'}
              </Button>
              <Button 
                onClick={resetModal} 
                variant="outline"
                disabled={isUploading}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Resultado da Importação</h3>
              <div className="space-y-2">
                <p>Total de registros: {uploadResult.total}</p>
                <p className="text-green-600">Processados com sucesso: {uploadResult.success}</p>
                <p className="text-red-600">Erros: {uploadResult.errors}</p>
              </div>
            </div>
            
            <Button onClick={resetModal} className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
