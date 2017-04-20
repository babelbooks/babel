import { Request, Response, NextFunction } from 'express';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): any {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    error: 'Request not authenticated'
  });
}
