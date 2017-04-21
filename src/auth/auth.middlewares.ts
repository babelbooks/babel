import { Request, Response, NextFunction, RequestHandler }  from 'express';

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

/**
 * The aim of this function is to skip a middleware function for a given
 * list of paths (and optionally associated methods), in particular
 * for authentication middleware (even though it can be used for any middleware).
 * @param middleware The middleware to potentially skip.
 * @param authorized The list of paths (and methods) authorized to skip the middleware.
 * @returns {any}
 */
export function skipFor(middleware: RequestHandler, authorized: Authorized[]): any {
  return (req: Request, res: Response, next: NextFunction) => {
    let routes: string[] = authorized.map((auth: Authorized) => {
      return auth.path;
    });
    let index = routes.indexOf(req.path);
    if(index > -1 && (!authorized[index].method || authorized[index].method === req.method)) {
      return next();
    }
    return middleware(req, res, next);
  }
}

/**
 * A path authorized to skip a middleware.
 */
export interface Authorized {
  /**
   * The relative path, for example '/test'.
   */
  path: string;

  /**
   * The optional method associated to the path,
   * for example 'GET'.
   */
  method?: string;
}