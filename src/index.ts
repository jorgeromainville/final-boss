import "dotenv/config";
import express from "express";
import type { Application } from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas montadas bajo /api
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dates", appointmentRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "API Clínica Salud Integral Operativa", status: "online" });
});

app.listen(PORT, () => {
  console.log(`🏥 Servidor corriendo en http://localhost:${PORT}`);
});
