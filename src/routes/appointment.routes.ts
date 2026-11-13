import { Router } from "express";
import {//importa las funciones del controlador de la cita
  createAppointmentHandler,
  updateAppointmentStatusHandler,
} from "../controllers/appointment.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js"; //importa el middleware de validacion
import { createAppointmentSchema } from "../schemas/appointmentSchema.js";//importa el schema de la cita
import { updateStatusSchema } from "../schemas/statusSchema.js";//importa el schema de actualizacion de estado
import { verifyToken } from "../middlewares/auth.middleware.js";//importa el middleware de verificacion de token
import { authorize } from "../middlewares/authorize.middleware.js";//importa el middleware de autorizacion

const router = Router(); //crea un router para las rutas de citas

router.post(
  "/", //la ruta de la cita
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateRequest(createAppointmentSchema),
  createAppointmentHandler
);

router.patch(
  "/:id/status",//la ruta de actualizacion de estado de la cita
  verifyToken,
  authorize("MEDICO"),
  validateRequest(updateStatusSchema),
  updateAppointmentStatusHandler
);

export default router;

