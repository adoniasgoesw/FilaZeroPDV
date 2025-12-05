import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    try {
        const { cpf, password } = req.body;

        // Validar campos obrigatórios
        if (!cpf || !password) {
            return res.status(400).json({ 
                error: 'CPF e senha são obrigatórios' 
            });
        }

        // Buscar usuário pelo CPF
        const userResult = await pool.query(
            `SELECT u.id, u.business_id, u.full_name, u.email, u.whatsapp, u.cpf, u.password, u.role, 
                    b.name as business_name, b.cnpj, b.address
             FROM users u
             INNER JOIN businesses b ON u.business_id = b.id
             WHERE u.cpf = $1`,
            [cpf]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ 
                error: 'CPF ou senha incorretos' 
            });
        }

        const user = userResult.rows[0];

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                error: 'CPF ou senha incorretos' 
            });
        }

        // Retornar dados do usuário (sem a senha)
        res.status(200).json({
            message: 'Login realizado com sucesso',
            user: {
                id: user.id,
                businessId: user.business_id,
                fullName: user.full_name,
                email: user.email,
                whatsapp: user.whatsapp,
                cpf: user.cpf,
                role: user.role,
                business: {
                    id: user.business_id,
                    name: user.business_name,
                    cnpj: user.cnpj,
                    address: user.address
                }
            }
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ 
            error: 'Erro ao fazer login. Tente novamente.' 
        });
    }
};



