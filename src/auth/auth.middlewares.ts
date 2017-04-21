import { Request, Response, NextFunction } from 'express';

/**
 * The aim of this middleware is to protect restricted API endpoints.
 * If the user is authenticated, the request is forwarded to the next middleware.
 * Otherwise, it interrupts it and sends back to the user a 401 status code.
 * The parameters are the same as the one needed by any express middleware.
 * @returns {any}
 */
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): any {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    error: 'Request not authenticated'
  });
}
