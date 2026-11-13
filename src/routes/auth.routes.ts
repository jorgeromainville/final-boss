import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";//importa los controladores de autenticacion

const router = Router();

router.post("/register", register);//ruta para el registro de nuevos usuarios
router.post("/login", login);//ruta para el inicio de sesion

export default router;

