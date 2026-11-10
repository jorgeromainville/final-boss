import { Router } from "express";
import {
  createAppointmentHandler,
  updateAppointmentStatusHandler,
} from "../controllers/appointment.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createAppointmentSchema } from "../schemas/appointmentSchema.js";
import { updateStatusSchema } from "../schemas/statusSchema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateRequest(createAppointmentSchema),
  createAppointmentHandler
);

router.patch(
  "/:id/status",
  verifyToken,
  authorize("MEDICO"),
  validateRequest(updateStatusSchema),
  updateAppointmentStatusHandler
);

export default router;

