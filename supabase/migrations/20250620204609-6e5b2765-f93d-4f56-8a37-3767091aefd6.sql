
-- Criar tabelas que ainda não existem e ajustar as existentes

-- Atualizar tabela tipo_equipamento se necessário
-- (já existe, manter como está)

-- Verificar se cliente precisa de ajustes
-- (já existe, manter como está)

-- Verificar se tecnico precisa de ajustes  
-- (já existe, manter como está)

-- Verificar se ordem_servico precisa de ajustes
-- (já existe, manter como está)

-- Criar tabela para histórico de movimentação de equipamentos (mais detalhada)
CREATE TABLE IF NOT EXISTS public.historico_movimentacao_equipamento (
  id_historico SERIAL PRIMARY KEY,
  equipamento_id INTEGER NOT NULL REFERENCES equipamento(id_equipamento),
  data_movimentacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tipo_movimentacao VARCHAR(50) NOT NULL, -- 'ENTRADA_ESTOQUE', 'SAIDA_TECNICO', 'RETORNO_TECNICO', 'INSTALACAO_CLIENTE', 'RETIRADA_CLIENTE'
  origem_tipo VARCHAR(20), -- 'ESTOQUE_CENTRAL', 'TECNICO', 'CLIENTE'
  origem_id INTEGER, -- ID do técnico ou cliente de origem
  destino_tipo VARCHAR(20), -- 'ESTOQUE_CENTRAL', 'TECNICO', 'CLIENTE'  
  destino_id INTEGER, -- ID do técnico ou cliente de destino
  os_relacionada_id INTEGER REFERENCES ordem_servico(id_os),
  observacoes TEXT,
  usuario_responsavel_id UUID REFERENCES auth.users(id),
  status_anterior VARCHAR(50),
  status_novo VARCHAR(50) NOT NULL
);

-- Criar tabela para equipamentos utilizados em OS
CREATE TABLE IF NOT EXISTS public.equipamento_os (
  id SERIAL PRIMARY KEY,
  os_id INTEGER NOT NULL REFERENCES ordem_servico(id_os),
  equipamento_id INTEGER NOT NULL REFERENCES equipamento(id_equipamento),
  tipo_utilizacao VARCHAR(20) NOT NULL, -- 'INSTALADO', 'RETIRADO'
  data_utilizacao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  observacoes TEXT
);

-- Criar tabela para controle de estoque por técnico (view materializada seria ideal, mas por simplicidade, usaremos trigger)
CREATE TABLE IF NOT EXISTS public.estoque_tecnico (
  id SERIAL PRIMARY KEY,
  tecnico_id INTEGER NOT NULL REFERENCES tecnico(id_tecnico),
  equipamento_id INTEGER NOT NULL REFERENCES equipamento(id_equipamento),
  data_atribuicao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(equipamento_id) -- Um equipamento só pode estar com um técnico
);

-- Atualizar perfis_usuarios para incluir mais tipos
ALTER TABLE public.perfis_usuarios 
DROP CONSTRAINT IF EXISTS perfis_usuarios_tipo_usuario_check;

ALTER TABLE public.perfis_usuarios 
ADD CONSTRAINT perfis_usuarios_tipo_usuario_check 
CHECK (tipo_usuario IN ('Admin', 'Técnico', 'Super Admin'));

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_equipamento_status ON equipamento(status_equipamento);
CREATE INDEX IF NOT EXISTS idx_equipamento_tecnico ON equipamento(tecnico_responsavel_id);
CREATE INDEX IF NOT EXISTS idx_equipamento_numero_serie ON equipamento(numero_serie);
CREATE INDEX IF NOT EXISTS idx_ordem_servico_status ON ordem_servico(status_os);
CREATE INDEX IF NOT EXISTS idx_ordem_servico_tecnico ON ordem_servico(tecnico_atribuido_id);
CREATE INDEX IF NOT EXISTS idx_historico_movimentacao_equipamento ON historico_movimentacao_equipamento(equipamento_id);

-- Habilitar RLS nas tabelas novas
ALTER TABLE public.historico_movimentacao_equipamento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipamento_os ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estoque_tecnico ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (acesso completo para usuários autenticados por enquanto)
CREATE POLICY "Usuários autenticados podem visualizar histórico movimentação" 
  ON public.historico_movimentacao_equipamento FOR SELECT 
  TO authenticated USING (true);

CREATE POLICY "Usuários autenticados podem inserir histórico movimentação" 
  ON public.historico_movimentacao_equipamento FOR INSERT 
  TO authenticated WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem visualizar equipamento_os" 
  ON public.equipamento_os FOR SELECT 
  TO authenticated USING (true);

CREATE POLICY "Usuários autenticados podem inserir equipamento_os" 
  ON public.equipamento_os FOR INSERT 
  TO authenticated WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem visualizar estoque_tecnico" 
  ON public.estoque_tecnico FOR SELECT 
  TO authenticated USING (true);

CREATE POLICY "Usuários autenticados podem gerenciar estoque_tecnico" 
  ON public.estoque_tecnico FOR ALL 
  TO authenticated USING (true) WITH CHECK (true);

-- Função para automatizar movimentação quando equipamento muda de técnico
CREATE OR REPLACE FUNCTION public.registrar_movimentacao_equipamento()
RETURNS TRIGGER AS $$
BEGIN
  -- Só registra se o técnico responsável mudou
  IF OLD.tecnico_responsavel_id IS DISTINCT FROM NEW.tecnico_responsavel_id 
     OR OLD.status_equipamento IS DISTINCT FROM NEW.status_equipamento
     OR OLD.localizacao_atual IS DISTINCT FROM NEW.localizacao_atual THEN
    
    INSERT INTO public.historico_movimentacao_equipamento (
      equipamento_id,
      tipo_movimentacao,
      origem_tipo,
      origem_id,
      destino_tipo,
      destino_id,
      status_anterior,
      status_novo,
      usuario_responsavel_id
    ) VALUES (
      NEW.id_equipamento,
      CASE 
        WHEN OLD.tecnico_responsavel_id IS NULL AND NEW.tecnico_responsavel_id IS NOT NULL THEN 'SAIDA_TECNICO'
        WHEN OLD.tecnico_responsavel_id IS NOT NULL AND NEW.tecnico_responsavel_id IS NULL THEN 'RETORNO_TECNICO'
        WHEN OLD.tecnico_responsavel_id IS NOT NULL AND NEW.tecnico_responsavel_id IS NOT NULL THEN 'TRANSFERENCIA_TECNICO'
        WHEN NEW.status_equipamento = 'Instalado' THEN 'INSTALACAO_CLIENTE'
        ELSE 'MOVIMENTACAO_GERAL'
      END,
      CASE 
        WHEN OLD.tecnico_responsavel_id IS NOT NULL THEN 'TECNICO'
        WHEN OLD.localizacao_atual = 'Estoque Central' THEN 'ESTOQUE_CENTRAL'
        ELSE 'CLIENTE'
      END,
      OLD.tecnico_responsavel_id,
      CASE 
        WHEN NEW.tecnico_responsavel_id IS NOT NULL THEN 'TECNICO'
        WHEN NEW.localizacao_atual = 'Estoque Central' THEN 'ESTOQUE_CENTRAL'
        ELSE 'CLIENTE'
      END,
      NEW.tecnico_responsavel_id,
      OLD.status_equipamento,
      NEW.status_equipamento,
      auth.uid()
    );
    
    -- Atualizar tabela estoque_tecnico
    IF OLD.tecnico_responsavel_id IS NOT NULL THEN
      DELETE FROM public.estoque_tecnico WHERE equipamento_id = NEW.id_equipamento;
    END IF;
    
    IF NEW.tecnico_responsavel_id IS NOT NULL THEN
      INSERT INTO public.estoque_tecnico (tecnico_id, equipamento_id)
      VALUES (NEW.tecnico_responsavel_id, NEW.id_equipamento)
      ON CONFLICT (equipamento_id) DO UPDATE SET 
        tecnico_id = NEW.tecnico_responsavel_id,
        data_atribuicao = now();
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger
DROP TRIGGER IF EXISTS trigger_movimentacao_equipamento ON public.equipamento;
CREATE TRIGGER trigger_movimentacao_equipamento
  AFTER UPDATE ON public.equipamento
  FOR EACH ROW
  EXECUTE FUNCTION public.registrar_movimentacao_equipamento();
