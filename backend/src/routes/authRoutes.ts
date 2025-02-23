import express from 'express';
import { register, login } from '../controllers/authController'
import { RequestHandler } from 'express';
const router = express.Router();

// Authentication routes
router.post('/register', register );
router.post('/login', login as RequestHandler);

export default router;
