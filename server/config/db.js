import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
})

pool.query('SELECT NOW()').then( result => {
    console.log("Connected to the database");
    console.log(result.rows[0]);
}).catch(err => {
    console.error("Error connecting to the database", err);
    process.exit(1);
})

pool.on('connect', (client) => {
    console.log("Connected to the database");
})


pool.on('error', (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(1);
})
 
export default pool;