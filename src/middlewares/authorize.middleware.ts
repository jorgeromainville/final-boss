import { Request, Response, NextFunction } from "express";// importa los tipos de ts Request, Response, NextFunction
import { AuthPayload } from "./auth.middleware.js";// importa la interface de auth.middleware.ts para saber los roles

export const authorize = (...roles: AuthPayload["role"][]) => {// autoriza solo a los roles que se mencionan en auth.middleware.ts
  return (req: Request, res: Response, next: NextFunction): void => {//recibe el rol y lo devuelve el middleware
    if (!req.user || !roles.includes(req.user.role)) {// dece: viene vacio el usuario? el array de roles no trae el rol del usuario en su token?
      res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });// si alguna falla envia error 403
      return;//termina la funcion
    }
    next();//si todo pasa bien le dice ve al siguente paso
  };
};

