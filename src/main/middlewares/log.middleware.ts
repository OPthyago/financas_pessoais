import { Request, Response, NextFunction } from 'express';

export const requestLoggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log('\n--- 🕵️ INCOMING REQUEST 🕵️ ---');
  console.log('METHOD:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('HEADERS:', req.headers);
  console.log('REQUEST', req)
  console.log('------------------------------\n');
  next();
};
