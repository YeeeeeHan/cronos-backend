import console from 'console';
import { NextFunction, Request, Response } from 'express';
export const sanitizePathParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `[sanitizePathParams]: req.params: ${JSON.stringify(req.params)}`
  );

  // obtain all path parameters if they exist
  for (const param in req.params) {
    req.params[param] = req.params[param] ? trimInput(req.params[param]) : '';
  }

  console.log(
    `[sanitizePathParams]: req.params: ${JSON.stringify(req.params)}`
  );
  next();
};

const trimInput = (input: string): string => {
  return input.trim();
};
