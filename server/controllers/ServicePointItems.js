import pool from '../config/db.js';

// POST - Criar item de ponto de atendimento
export const createServicePointItem = async (req, res) => {
    try {
        const { business_id, identifier, name_point, status } = req.body;

        if (!business_id || !identifier) {
            return res.status(400).json({ 
                error: 'business_id e identifier são obrigatórios' 
            });
        }

        // Verificar se já existe um item ativo para este identifier
        const existingItem = await pool.query(
            `SELECT id FROM service_point_items 
             WHERE business_id = $1 AND identifier = $2 AND status != 'closed'`,
            [business_id, identifier]
        );

        if (existingItem.rows.length > 0) {
            return res.status(400).json({ 
                error: 'Já existe um ponto de atendimento aberto com esta identificação' 
            });
        }

        // Criar novo item
        const result = await pool.query(
            `INSERT INTO service_point_items (
                business_id,
                identifier,
                name_point,
                status,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *`,
            [business_id, identifier, name_point || null, status || 'open']
        );

        const item = result.rows[0];
        res.status(201).json({
            message: 'Ponto de atendimento criado com sucesso',
            servicePointItem: {
                id: item.id,
                businessId: item.business_id,
                identifier: item.identifier,
                namePoint: item.name_point,
                status: item.status,
                createdAt: item.created_at,
                updatedAt: item.updated_at
            }
        });

    } catch (error) {
        console.error('Error creating service point item:', error);
        res.status(500).json({ 
            error: 'Erro ao criar ponto de atendimento' 
        });
    }
};

// GET - Listar itens de pontos de atendimento
export const getServicePointItems = async (req, res) => {
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
                identifier,
                name_point,
                status,
                created_at,
                updated_at
             FROM service_point_items
             WHERE business_id = $1 AND status != 'closed'
             ORDER BY created_at DESC`,
            [businessId]
        );

        const items = result.rows.map(item => ({
            id: item.id,
            businessId: item.business_id,
            identifier: item.identifier,
            namePoint: item.name_point,
            status: item.status,
            createdAt: item.created_at,
            updatedAt: item.updated_at
        }));

        res.status(200).json({
            servicePointItems: items
        });

    } catch (error) {
        console.error('Error getting service point items:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar pontos de atendimento' 
        });
    }
};

// GET - Buscar item específico por identifier
export const getServicePointItemByIdentifier = async (req, res) => {
    try {
        const businessId = req.query.business_id || req.body.business_id;
        const identifier = req.query.identifier || req.params.identifier;

        if (!businessId || !identifier) {
            return res.status(400).json({ 
                error: 'business_id e identifier são obrigatórios' 
            });
        }

        const result = await pool.query(
            `SELECT 
                id,
                business_id,
                identifier,
                name_point,
                status,
                created_at,
                updated_at
             FROM service_point_items
             WHERE business_id = $1 AND identifier = $2 AND status != 'closed'
             ORDER BY created_at DESC
             LIMIT 1`,
            [businessId, identifier]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Ponto de atendimento não encontrado' 
            });
        }

        const item = result.rows[0];
        res.status(200).json({
            servicePointItem: {
                id: item.id,
                businessId: item.business_id,
                identifier: item.identifier,
                namePoint: item.name_point,
                status: item.status,
                createdAt: item.created_at,
                updatedAt: item.updated_at
            }
        });

    } catch (error) {
        console.error('Error getting service point item:', error);
        res.status(500).json({ 
            error: 'Erro ao buscar ponto de atendimento' 
        });
    }
};

// PUT - Atualizar item de ponto de atendimento
export const updateServicePointItem = async (req, res) => {
    try {
        const { id, business_id, identifier, name_point, status } = req.body;

        if (!id && (!business_id || !identifier)) {
            return res.status(400).json({ 
                error: 'id ou (business_id e identifier) são obrigatórios' 
            });
        }

        let result;

        if (id) {
            // Atualizar por ID
            result = await pool.query(
                `UPDATE service_point_items
                 SET 
                    name_point = COALESCE($2, name_point),
                    status = COALESCE($3, status),
                    updated_at = CURRENT_TIMESTAMP
                 WHERE id = $1
                 RETURNING *`,
                [id, name_point !== undefined ? name_point : null, status || null]
            );
        } else {
            // Atualizar por business_id e identifier
            result = await pool.query(
                `UPDATE service_point_items
                 SET 
                    name_point = COALESCE($3, name_point),
                    status = COALESCE($4, status),
                    updated_at = CURRENT_TIMESTAMP
                 WHERE business_id = $1 AND identifier = $2 AND status != 'closed'
                 RETURNING *`,
                [business_id, identifier, name_point !== undefined ? name_point : null, status || null]
            );
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Ponto de atendimento não encontrado' 
            });
        }

        const item = result.rows[0];
        res.status(200).json({
            message: 'Ponto de atendimento atualizado com sucesso',
            servicePointItem: {
                id: item.id,
                businessId: item.business_id,
                identifier: item.identifier,
                namePoint: item.name_point,
                status: item.status,
                createdAt: item.created_at,
                updatedAt: item.updated_at
            }
        });

    } catch (error) {
        console.error('Error updating service point item:', error);
        res.status(500).json({ 
            error: 'Erro ao atualizar ponto de atendimento' 
        });
    }
};

