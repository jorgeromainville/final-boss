import { Router } from "express";
import {
  createPatientHandler,
  getPatientsHandler,
  getPatientByIdHandler,
} from "../controllers/patient.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createPatientSchema } from "../schemas/patientSchema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.use(verifyToken, authorize("RECEPCIONISTA"));

router.post("/", validateRequest(createPatientSchema), createPatientHandler);
router.get("/", getPatientsHandler);
router.get("/:id", getPatientByIdHandler);

export default router;
