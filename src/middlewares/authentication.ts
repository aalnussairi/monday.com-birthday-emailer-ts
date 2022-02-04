import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      session: {
        accountId: string;
        userId: string;
        backToUrl: string;
        shortLivedToken: string;
      };
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization ?? req.query?.token;
  if (typeof authorization !== 'string') {
    res
      .status(401)
      .json({ error: 'not authenticated, no credentials in request' });
    return;
  }
  if (typeof process.env.MONDAY_SIGNING_SECRET !== 'string') {
    res.status(500).json({
      error: 'Missing MONDAY_SIGNING_SECRET (in the .env file)',
    });
    return;
  }
  const { accountId, userId, backToUrl, shortLivedToken } = jwt.verify(
    authorization,
    process.env.MONDAY_SIGNING_SECRET
  );
  req.session = { accountId, userId, backToUrl, shortLivedToken };
  next();
};

export default authMiddleware;
