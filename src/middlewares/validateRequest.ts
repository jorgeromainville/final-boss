import { Request, Response, NextFunction } from "express";// importa los tipos de ts Request, Response, NextFunction
import { AnyZodObject } from "zod";//importa la libreria de ZOD

export const validateRequest = (schema: AnyZodObject) => {// exportamos el validador de las respuestas/parametros
  return (req: Request, res: Response, next: NextFunction): void => {// retorna el middleware de express
    const result = schema.safeParse(req.body);//tomamos lo que el cliente envio y lo pasamos por el esquema
    if (!result.success) {// si el result(los valores que envio el cliente) es falso da error 400
      res.status(400).json({
        message: "Error de validación",
        errors: result.error.errors.map((e) => ({// no entiendo muy bien que hacer ZOD pero creo que es que guarda los errores en una lista y luego los tranforma
          campo: e.path.join("."),
          mensaje: e.message,
        })),
      });
      return;
    }
    req.body = result.data;//replaza los datos validos y transformados de body (envia una fecha: string => date)
    next();//siguienteee paso
  };
};

