import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const {
            // Step 1: User data
            fullName,
            email,
            whatsapp,
            // Step 2: Establishment data
            establishmentName,
            cnpj,
            address,
            // Step 3: Access data
            cpf,
            password
        } = req.body;

        // Validar campos obrigatórios
        if (!fullName || !email || !whatsapp || !establishmentName || !address || !cpf || !password) {
            await client.query('ROLLBACK');
            return res.status(400).json({ 
                error: 'Todos os campos obrigatórios devem ser preenchidos' 
            });
        }

        // Verificar se email já existe
        const emailCheck = await client.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );
        
        if (emailCheck.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ 
                error: 'Este email já está cadastrado' 
            });
        }

        // Verificar se CPF já existe
        const cpfCheck = await client.query(
            'SELECT id FROM users WHERE cpf = $1',
            [cpf]
        );
        
        if (cpfCheck.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ 
                error: 'Este CPF já está cadastrado' 
            });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // 1. Criar estabelecimento primeiro
        const businessResult = await client.query(
            `INSERT INTO businesses (name, cnpj, address, created_at, updated_at)
             VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING id`,
            [establishmentName, cnpj || null, address]
        );

        const businessId = businessResult.rows[0].id;

        // 2. Criar usuário com o business_id
        const userResult = await client.query(
            `INSERT INTO users (business_id, full_name, email, whatsapp, cpf, password, role, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, 'administrator', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             RETURNING id, full_name, email, role`,
            [businessId, fullName, email, whatsapp, cpf, hashedPassword]
        );

        // 3. Criar pontos de atendimento padrão (4 mesas ativadas)
        await client.query(
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
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [businessId, false, 0, true, 4, false, 0]
        );

        await client.query('COMMIT');

        res.status(201).json({
            message: 'Conta criada com sucesso',
            user: {
                id: userResult.rows[0].id,
                fullName: userResult.rows[0].full_name,
                email: userResult.rows[0].email,
                role: userResult.rows[0].role,
                businessId: businessId
            }
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error registering user:', error);
        res.status(500).json({ 
            error: 'Erro ao criar conta. Tente novamente.' 
        });
    } finally {
        client.release();
    }
};

