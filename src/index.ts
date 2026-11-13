import "dotenv/config";// carga el archivo .env apenas arranca el server
import express from "express";// importa la libreria de express
import type { Application } from "express";// importa el tipo app de ts para no traer cosas de mas
import cors from "cors";// importa cors 
import swaggerUi from "swagger-ui-express";// importa interfaz visual de swagger
import { swaggerDocument } from "./config/swagger.js";// importa la especificacion de las rutas para swagger

import authRoutes from "./routes/auth.routes.js";//trae las rutas de autenticacion (registro y login)
import patientRoutes from "./routes/patient.routes.js";//trae las rutas de pacientes
import doctorRoutes from "./routes/doctor.routes.js";//trae las rutas de doctores
import appointmentRoutes from "./routes/appointment.routes.js";//trae las rutas de citas
import reportRoutes from "./routes/report.routes.js";//trae las rutas de reportes de gerencia

const app: Application = express();//guarda el server en la costante app 
const PORT = process.env.PORT || 3000; //lee el puerto en .env o usa por defecto el 3000

app.use(cors());//pone CORS en todas las rutas de mi api
app.use(express.json());//activa el traductor JSON para cuando envian datos || JSON => objeto de js dentro de req body

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));// documentacion interactiva de swagger en /api/docs
app.use("/api/auth", authRoutes);// url de autenticacion ejm: /api/auth/login)
app.use("/api/patients", patientRoutes);// url de pacientes
app.use("/api/doctors", doctorRoutes);// url de doctor 
app.use("/api/appointments", appointmentRoutes);// url de citas
app.use("/api/dates", appointmentRoutes);// url de citas mas cortito
app.use("/api/reports", reportRoutes);// url de reportes para gerencia

app.get("/", (_req, res) => {
  res.json({ message: "API Clinica Salud Integral", status: "ok" });
});// url de get si entran desde el navegador con una respuesta de ok

app.listen(PORT, () => {//enciende el servidor para ecuchar peticiones
  console.log(`Servidor corriendo en http://localhost:${PORT}`);// respuesta en la consola para decir que el server esta corriendo 
});
