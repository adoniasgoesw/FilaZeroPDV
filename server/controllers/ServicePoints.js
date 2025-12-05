import pool from '../config/db.js';

// GET - Buscar configuração de pontos de atendimento
export const getServicePoints = async (req, res) => {
    try {
        const businessId = req.query.business_id || req.body.business_id;

        if (!businessId) {
            return res.status(400).json({ 
                error: 'business_id é obrigatório' 
            });
        }

        const result = await pool.query(
            `SELECT 
                id,
                business_id,
                counters_enabled,
                counters_quantity,
                tables_enabled,
                tables_quantity,
                order_slips_enabled,
                order_slips_quantity,
                created_at,
                updated_at
             FROM service_points
             WHERE business_id = $1`,
            [businessId]
        );

        if (result.rows.length === 0) {
            // Se não existe, criar com valores padrão
            const defaultResult = await pool.query(
                `INSERT INTO service_points (
                    business_id,
                    counters_enabled,
                    counters_quantity,
                    tables_enabled,
                    tables_quantity,
                    order_slips_enabled,
                    order_slips_quantity,
                    created_at,
                    updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING *`,
                [businessId, false, 0, true, 4, false, 0]
            );

            return res.status(200).json({
                servicePoints: {
                    id: defaultResult.rows[0].id,
                    businessId: defaultResult.rows[0].business_id,
                    countersEnabled: defaultResult.rows[0].counters_enabled,
                    countersQuantity: defaultResult.rows[0].counters_quantity,
                    tablesEnabled: defaultResult.rows[0].tables_enabled,
                    tablesQuantity: defaultResult.rows[0].tables_quantity,
                    orderSlipsEnabled: defaultResult.rows[0].order_slips_enabled,
                    orderSlipsQuantity: defaultResult.rows[0].order_slips_quantity,
                    createdAt: defaultResult.rows[0].created_at,
                    updatedAt: defaultResult.rows[0].updated_at
                }
            });
        }

        const servicePoint = result.rows[0];
        res.status(200).json({
            servicePoints: {
                id: servicePoint.id,
                businessId: servicePoint.business_id,
                countersEnabled: servicePoint.counters_enabled,
                countersQuantity: servicePoint.counters_quantity,
                tablesEnabled: servicePoint.tables_enabled,
                tablesQuantity: servicePoint.tables_quantity,
                orderSlipsEnabled: servicePoint.order_slips_enabled,
                orderSlipsQuantity: servicePoint.order_slips_quantity,
                createdAt: servicePoint.created_at,
                updatedAt: servicePoint.updated_at
            }
        });

    } catch (error) {
        console.error('Error getting service points:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar pontos de atendimento' 
        });
    }
};

// PUT - Atualizar configuração de pontos de atendimento
export const updateServicePoints = async (req, res) => {
    try {
        const {
            business_id,
            counters_enabled,
            counters_quantity,
            tables_enabled,
            tables_quantity,
            order_slips_enabled,
            order_slips_quantity
        } = req.body;

        if (!business_id) {
            return res.status(400).json({ 
                error: 'business_id é obrigatório' 
            });
        }

        // Verificar se existe registro
        const checkResult = await pool.query(
            'SELECT id FROM service_points WHERE business_id = $1',
            [business_id]
        );

        let result;

        if (checkResult.rows.length === 0) {
            // Criar novo registro
            result = await pool.query(
                `INSERT INTO service_points (
                    business_id,
                    counters_enabled,
                    counters_quantity,
                    tables_enabled,
                    tables_quantity,
                    order_slips_enabled,
                    order_slips_quantity,
                    created_at,
                    updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING *`,
                [
                    business_id,
                    counters_enabled || false,
                    counters_quantity || 0,
                    tables_enabled !== undefined ? tables_enabled : true,
                    tables_quantity !== undefined ? tables_quantity : 4,
                    order_slips_enabled || false,
                    order_slips_quantity || 0
                ]
            );
        } else {
            // Atualizar registro existente
            result = await pool.query(
                `UPDATE service_points
                 SET 
                    counters_enabled = $2,
                    counters_quantity = $3,
                    tables_enabled = $4,
                    tables_quantity = $5,
                    order_slips_enabled = $6,
                    order_slips_quantity = $7,
                    updated_at = CURRENT_TIMESTAMP
                 WHERE business_id = $1
                 RETURNING *`,
                [
                    business_id,
                    counters_enabled !== undefined ? counters_enabled : false,
                    counters_quantity !== undefined ? counters_quantity : 0,
                    tables_enabled !== undefined ? tables_enabled : true,
                    tables_quantity !== undefined ? tables_quantity : 4,
                    order_slips_enabled !== undefined ? order_slips_enabled : false,
                    order_slips_quantity !== undefined ? order_slips_quantity : 0
                ]
            );
        }

        const updated = result.rows[0];
        res.status(200).json({
            message: 'Pontos de atendimento atualizados com sucesso',
            servicePoints: {
                id: updated.id,
                businessId: updated.business_id,
                countersEnabled: updated.counters_enabled,
                countersQuantity: updated.counters_quantity,
                tablesEnabled: updated.tables_enabled,
                tablesQuantity: updated.tables_quantity,
                orderSlipsEnabled: updated.order_slips_enabled,
                orderSlipsQuantity: updated.order_slips_quantity,
                createdAt: updated.created_at,
                updatedAt: updated.updated_at
            }
        });

    } catch (error) {
        console.error('Error updating service points:', error);
        res.status(500).json({ 
            error: 'Erro ao atualizar pontos de atendimento' 
        });
    }
};

// GET - Listar pontos de atendimento baseado na configuração
export const listServicePoints = async (req, res) => {
    try {
        const businessId = req.query.business_id || req.body.business_id;

        if (!businessId) {
            return res.status(400).json({ 
                error: 'business_id é obrigatório' 
            });
        }

        // Buscar configuração de pontos de atendimento
        const configResult = await pool.query(
            `SELECT 
                counters_enabled,
                counters_quantity,
                tables_enabled,
                tables_quantity,
                order_slips_enabled,
                order_slips_quantity
             FROM service_points
             WHERE business_id = $1`,
            [businessId]
        );

        if (configResult.rows.length === 0) {
            return res.status(200).json({ servicePoints: [] });
        }

        const config = configResult.rows[0];
        const points = [];

        // Gerar pontos de mesa
        if (config.tables_enabled && config.tables_quantity > 0) {
            for (let i = 1; i <= config.tables_quantity; i++) {
                points.push({
                    id: `table-${i}`,
                    type: 'table',
                    identification: `Mesa ${String(i).padStart(2, '0')}`,
                    name: null,
                    totalValue: 0,
                    activityTime: 0,
                    status: 'available'
                });
            }
        }

        // Gerar pontos de balcão
        if (config.counters_enabled && config.counters_quantity > 0) {
            for (let i = 1; i <= config.counters_quantity; i++) {
                points.push({
                    id: `counter-${i}`,
                    type: 'counter',
                    identification: `Balcão ${String(i).padStart(2, '0')}`,
                    name: null,
                    totalValue: 0,
                    activityTime: 0,
                    status: 'available'
                });
            }
        }

        // Gerar pontos de comanda
        if (config.order_slips_enabled && config.order_slips_quantity > 0) {
            for (let i = 1; i <= config.order_slips_quantity; i++) {
                points.push({
                    id: `order-slip-${i}`,
                    type: 'order_slip',
                    identification: `Comanda ${String(i).padStart(2, '0')}`,
                    name: null,
                    totalValue: 0,
                    activityTime: 0,
                    status: 'available'
                });
            }
        }

        res.status(200).json({
            servicePoints: points
        });

    } catch (error) {
        console.error('Error listing service points:', error);
        res.status(500).json({ 
            error: 'Erro ao listar pontos de atendimento' 
        });
    }
};

