import { Router } from "express";
import {//importa los controladores de los reportes
  getSpecialtyReportHandler,
  getDailyCutoffHandler,
} from "../controllers/report.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";//importa el middleware de verificacion de token
import { authorize } from "../middlewares/authorize.middleware.js";//importa el middleware de autorizacion

const router = Router();

router.use(verifyToken, authorize("GERENCIA"));//usa el middleware de verificar token y autorizacion

router.get("/appointments-by-specialty", getSpecialtyReportHandler);//obtiene el reporte de citas por especialidad
router.get("/daily-cutoff", getDailyCutoffHandler);//obtiene el cierre diario de citas

export default router;

