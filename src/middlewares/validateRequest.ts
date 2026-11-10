import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: result.error.errors.map((e) => ({
          campo: e.path.join("."),
          mensaje: e.message,
        })),
      });
      return;
    }
    req.body = result.data;
    next();
  };
};
