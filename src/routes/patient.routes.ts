import { Router } from "express";//importa el router de express
import {//importa los controladores de pacientes
  createPatientHandler,
  getPatientsHandler,
  getPatientByIdHandler,
} from "../controllers/patient.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";//importa el middleware de validacion
import { createPatientSchema } from "../schemas/patientSchema.js";//importa el schema de validacion
import { verifyToken } from "../middlewares/auth.middleware.js";//importa el middleware de verificacion de token
import { authorize } from "../middlewares/authorize.middleware.js";//importa el middleware de autorizacion

const router = Router();

router.use(verifyToken, authorize("RECEPCIONISTA"));//aplica el middleware de verificacion de token y autorizacion a todas las rutas

router.post("/", validateRequest(createPatientSchema), createPatientHandler);//ruta para crear un paciente
router.get("/", getPatientsHandler);//ruta para obtener todos los pacientes
router.get("/:id", getPatientByIdHandler);//ruta para obtener un paciente por id

export default router;

