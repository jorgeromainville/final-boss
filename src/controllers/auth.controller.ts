import { Request, Response } from "express";// importa los tipos de ts Request, Response
import bcrypt from "bcryptjs";// Librería para encriptar (hashear) y comparar contraseñas.
import jwt from "jsonwebtoken";// libreria para fabricar y firmar el token JWT
import prisma from "../config/prisma.js";//conexion a PosgrestSQL

export const register = async (req: Request, res: Response): Promise<void> => { // exporta el controlador con asincronia para crear usuario
  try {//intenta ejecutar el registro
    const { email, password, role } = req.body;// saca los campos que envio el cliente en JSON
    if (!email || !password || !role) {// si falta algun dato corta con error 400 
      res.status(400).json({ message: "Email, password y role son obligatorios" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);//hashea la contraseña || revuelve la contra 10 veces y esperaaaa un ratico mientras se hashea
    const user = await prisma.usuario.create({ // espera que PosgrestSQL guarde la fila nueva 
      data: { email, password: hashedPassword, role },//crea la fila en la tabla user pero con la clave sifrada
      select: { id: true, email: true, role: true, createdAt: true },// devuelve esos datos pero no la clave
    });

    res.status(201).json(user);//codigo HTTP creado
  } catch (error: any) {// catch para decir que si un valor Uique ya existe no se puede crear
    if (error.code === "P2002") {
      res.status(409).json({ message: "El usuario ya existe" });
      return;
    }
    res.status(500).json({ message: "Error al registrar el usuario" });//por si ocurre otro error
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {//exporta el controlador con asincronia para logear usuario
  try {
    const { email, password } = req.body;//revisa el cuerpo sacando el correo y contrasena
    const user = await prisma.usuario.findUnique({ where: { email } });// busca en la tabla ese usuario con ese correo unico

    if (!user || !(await bcrypt.compare(password, user.password))) { //alguien tiene ese email? || compara la clave con el hash guardada en la BD
      res.status(401).json({ message: "Credenciales inválidas" }); // devuelve error 401 si alguno falla
      return;
    }

    const token = jwt.sign( //fabrica el token con:
      { id: user.id, email: user.email, role: user.role },//id, email y rol para que lo lea AuthPayload
      process.env.JWT_SECRET as string,//pone la firma secreta de .env
      { expiresIn: "8h" }// dura 8 horas el token
    );

    res.json({ token, role: user.role, email: user.email });// da el token al cliente 200
  } catch {// si pasa algo que no deberia sale error 500
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

