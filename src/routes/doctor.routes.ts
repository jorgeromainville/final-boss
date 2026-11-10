import { Router } from "express";
import {
  getDoctorsHandler,
  getSpecialtiesHandler,
} from "../controllers/doctor.controller.js";
import { getDoctorAgendaHandler } from "../controllers/appointment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.get("/specialties", verifyToken, getSpecialtiesHandler);
router.get("/", verifyToken, authorize("RECEPCIONISTA", "MEDICO"), getDoctorsHandler);
router.get("/:id/appointments", verifyToken, authorize("MEDICO"), getDoctorAgendaHandler);
router.get("/:id/dates", verifyToken, authorize("MEDICO"), getDoctorAgendaHandler);

export default router;

