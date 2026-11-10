import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "./auth.middleware.js";

export const authorize = (...roles: AuthPayload["role"][]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });
      return;
    }
    next();
  };
};
