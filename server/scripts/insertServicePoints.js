import pool from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

async function insertServicePoints() {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');

        // Buscar todos os businesses que não têm service_points
        const businessesWithoutServicePoints = await client.query(
            `SELECT b.id, b.name
             FROM businesses b
             LEFT JOIN service_points sp ON b.id = sp.business_id
             WHERE sp.id IS NULL`
        );

        console.log(`Encontrados ${businessesWithoutServicePoints.rows.length} estabelecimentos sem pontos de atendimento.`);

        if (businessesWithoutServicePoints.rows.length === 0) {
            console.log('Todos os estabelecimentos já possuem pontos de atendimento configurados.');
            await client.query('COMMIT');
            return;
        }

        // Inserir service_points padrão para cada business
        for (const business of businessesWithoutServicePoints.rows) {
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
                [business.id, false, 0, true, 4, false, 0]
            );

            console.log(`✓ Pontos de atendimento criados para: ${business.name} (ID: ${business.id})`);
        }

        await client.query('COMMIT');
        console.log('\n✅ Script executado com sucesso!');
        console.log(`✅ ${businessesWithoutServicePoints.rows.length} estabelecimento(s) configurado(s) com pontos de atendimento padrão.`);

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Erro ao executar script:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Executar o script
insertServicePoints()
    .then(() => {
        console.log('\n✅ Processo finalizado.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Erro fatal:', error);
        process.exit(1);
    });

