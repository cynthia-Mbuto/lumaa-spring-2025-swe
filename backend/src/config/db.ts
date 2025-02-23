import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT), 
});

const connectToDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database');
    } catch (err: any) {
        console.error('Error connecting to the database', err);
    }
};


export {pool, connectToDB};
