import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      res.status(400).json({ message: "Email, password y role son obligatorios" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: { email, password: hashedPassword, role },
      select: { id: true, email: true, role: true, createdAt: true },
    });

    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "El usuario ya existe" });
      return;
    }
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" }
    );

    res.json({ token, role: user.role, email: user.email });
  } catch {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
