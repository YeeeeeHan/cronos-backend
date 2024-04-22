import { NextFunction, Request, Response } from 'express';
export const sanitizePathParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // trim all path params
  for (const param in req.params) {
    req.params[param] = req.params[param] ? trimInput(req.params[param]) : '';
  }
  next();
};

const trimInput = (input: string): string => {
  return input.trim();
};
