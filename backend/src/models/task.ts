import { Pool } from 'pg';
import { QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});

export const getTasks = async (userId?: number): Promise<QueryResult> => {
    const query = userId
        ? 'SELECT * FROM tasks WHERE "userid" = $1'
        : 'SELECT * FROM tasks';
    const values = userId ? [userId] : [];
    return pool.query(query, values);
};
export const getTaskById = async (id: number): Promise<QueryResult> => {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    return pool.query(query, [id]);
};
export const createTask = async (
    title: string,
    description?: string,
    userId?: number
): Promise<QueryResult> => {
    const query = 'INSERT INTO tasks (title, description, "userid", "iscomplete") VALUES ($1, $2, $3, $4) RETURNING *';
    return pool.query(query, [title, description, userId, false]);
};

export const updateTask = async (
    id: number,
    title?: string,
    description?: string,
    iscomplete?: boolean
): Promise<QueryResult> => {
    // Fetch the current task to retain existing values if not provided
    const currentTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    const updatedTitle = title ?? currentTask.rows[0].title;
    const updatedDescription = description ?? currentTask.rows[0].description;
    const updatedIsComplete = iscomplete ?? currentTask.rows[0].iscomplete;

    const query = `UPDATE tasks SET title = $1, description = $2, "iscomplete" = $3 WHERE id = $4 RETURNING *`;

    const result = await pool.query(query, [updatedTitle, updatedDescription, updatedIsComplete, id]);
    console.log("updated task model", result.rows[0]);
    return result;
};

export const deleteTask = async (id: number): Promise<QueryResult> => {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    return pool.query(query, [id]);
};
