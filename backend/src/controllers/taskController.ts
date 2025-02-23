import { Request, Response } from 'express';
import {
    createTask as createTaskModel,
    updateTask as updateTaskModel,
    getTasks as getTasksModel,
    deleteTask as deleteTaskModel,
    getTaskById as getTaskByIdModel
} from '../models/task';

const createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;
    try {
        const result = await createTaskModel(title, description, req.user.id);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating task.' });
    }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, iscomplete } = req.body;
    const id = parseInt(req.params.id);
    console.log("Task ID", id);
    try {
        const result = await updateTaskModel(id, title, description, iscomplete);
        console.log("updated task backend", result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating task.' });
    }
};

const getTasks = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
    try {
        const result = await getTasksModel(userId);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving tasks.' });
    }
};

const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const result = await getTaskByIdModel(id);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving task.' });
    }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        await deleteTaskModel(id);
        res.json({ message: `Task with ID ${id} deleted successfully.` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting task.' });
    }
};

export { createTask, updateTask, getTasks, deleteTask, getTaskById };