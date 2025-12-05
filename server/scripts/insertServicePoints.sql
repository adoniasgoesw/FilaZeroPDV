-- Script SQL para inserir pontos de atendimento padrão
-- Para estabelecimentos que ainda não possuem configuração

-- Inserir service_points padrão para todos os businesses que não têm
INSERT INTO service_points (
    business_id,
    counters_enabled,
    counters_quantity,
    tables_enabled,
    tables_quantity,
    order_slips_enabled,
    order_slips_quantity,
    created_at,
    updated_at
)
SELECT 
    b.id,
    false,  -- counters_enabled
    0,      -- counters_quantity
    true,   -- tables_enabled
    4,      -- tables_quantity
    false,  -- order_slips_enabled
    0,      -- order_slips_quantity
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM businesses b
LEFT JOIN service_points sp ON b.id = sp.business_id
WHERE sp.id IS NULL;

-- Verificar quantos registros foram inseridos
SELECT COUNT(*) as total_inseridos
FROM service_points
WHERE tables_enabled = true AND tables_quantity = 4;

