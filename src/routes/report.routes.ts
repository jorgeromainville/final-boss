import { Router } from "express";
import {
  getSpecialtyReportHandler,
  getDailyCutoffHandler,
} from "../controllers/report.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.use(verifyToken, authorize("GERENCIA"));

router.get("/appointments-by-specialty", getSpecialtyReportHandler);
router.get("/daily-cutoff", getDailyCutoffHandler);

export default router;
