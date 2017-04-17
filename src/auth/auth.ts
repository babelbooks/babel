import { Request, Response, NextFunction } from 'express';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): any {
  console.log('Ensuring authenticated...');
  console.log(req.user);
  if(req.isAuthenticated()) {
    return next();
  }
  console.error('ERROR: User not authenticated. Sending error.');
  res.status(401).json({
    error: 'Request not authenticated'
  });
}