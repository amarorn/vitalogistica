import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'vitta-logistica-secret-key';

interface TokenPayload {
  userId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = {
  authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const parts = authHeader.split(' ');

      if (parts.length !== 2) {
        return res.status(401).json({ message: 'Token mal formatado' });
      }

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token mal formatado' });
      }

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = decoded as TokenPayload;
        return next();
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao autenticar' });
    }
  },

  authorize(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Acesso negado' });
      }

      return next();
    };
  }
}; 