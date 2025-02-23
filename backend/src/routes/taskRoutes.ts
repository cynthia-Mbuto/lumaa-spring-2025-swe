import express from 'express';
import { createTask, updateTask, deleteTask, getTasks, getTaskById } from '../controllers/taskController';
import authenticateMiddleware from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/', authenticateMiddleware, createTask);
router.put('/:id', authenticateMiddleware, updateTask);
router.delete('/:id', authenticateMiddleware, deleteTask);
router.get('/', authenticateMiddleware, getTasks);
router.get('/:id', authenticateMiddleware, getTaskById);
export default router;

