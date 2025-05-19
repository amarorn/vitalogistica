import { Router } from 'express';
import { budgetController } from '../controllers/budgetController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Todas as rotas de orçamento requerem autenticação
router.use(authMiddleware.authenticate);

// Rotas para operadores
router.get('/', budgetController.list);
router.get('/:id', budgetController.getById);

// Rotas para operadores e aprovadores
router.post('/', 
  authMiddleware.authorize(['operador', 'aprovador', 'administrador']),
  budgetController.create
);

router.put('/:id',
  authMiddleware.authorize(['operador', 'aprovador', 'administrador']),
  budgetController.update
);

// Rotas apenas para aprovadores e administradores
router.post('/:id/approve',
  authMiddleware.authorize(['aprovador', 'administrador']),
  budgetController.approve
);

// Rotas apenas para administradores
router.delete('/:id',
  authMiddleware.authorize(['administrador']),
  budgetController.delete
);

export default router; 