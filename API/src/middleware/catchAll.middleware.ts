import { Request, Response, NextFunction } from "express";

const catchAllMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new Error(
    `invalid api route | ${req.method} - ${req.originalUrl}`
  );
  next(err);
};

export default catchAllMiddleware;
