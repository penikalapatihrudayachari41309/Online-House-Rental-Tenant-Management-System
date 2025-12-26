import { Request, Response, NextFunction } from 'express';

// Require a specific role to access route
export const requireRole = (role: 'Owner' | 'Tenant' | 'Admin') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};
