import { Request, Response, NextFunction } from "express";// importa los tipos de ts Request, Response, NextFunction
import jwt from "jsonwebtoken";// importa la libreria JWT

export interface AuthPayload {//define que datos se ponen en el token
  id: number;
  email: string;
  role: "RECEPCIONISTA" | "MEDICO" | "GERENCIA";
}

declare global {//que traiga la propiedad req.user de forma opcional
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // crea y exporta el middleware verifyToken y no devulve ningun valor
  const header = req.headers.authorization; //lee la cabezera authorization que envio el cliente

  if (!header || !header.startsWith("Bearer ")) {// revisa sis llego la cabezera o si llego pero sin "Bearer "
    res.status(401).json({ message: "Token no proporcionado" });// envia 401 si no llego vien la cabezera o de plano no llego
    return;// termina la funcion y acaba
  }

  const token = header.split(" ")[1];// corta el Bearer eyJhbGsadsoipgadsaderwci... justo en el esapcio para tener un token limpio

  try {//intenta verificar si vale el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
    //comprueba con .env que el token fue creado con mi server y no se vencio
    req.user = decoded; //pega los datos del usuario en req.user 
    next();// es como decir: pasa al siguiente middleware o controlador
  } catch {// si el token no era valido devuelve codigo 401
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

