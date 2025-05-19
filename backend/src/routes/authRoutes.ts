import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Rotas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

// Rotas protegidas
router.get('/me', authMiddleware.authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router; 