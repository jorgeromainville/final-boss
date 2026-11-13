import { Router } from "express";//crea un minimapa de las rutas de doctor 
import {//trae los controladores de doctor
  getDoctorsHandler,
  getSpecialtiesHandler,
} from "../controllers/doctor.controller.js";
import { getDoctorAgendaHandler } from "../controllers/appointment.controller.js"; //trae el controlador de citas
import { verifyToken } from "../middlewares/auth.middleware.js"; // revisa si trajiste el token de JWt
import { authorize } from "../middlewares/authorize.middleware.js"; // revisa si tu rol tiene autorizacion

const router = Router(); // crea la ruta vacia 

router.get("/specialties", verifyToken, getSpecialtiesHandler);// url de get con verificacion
router.get("/", verifyToken, authorize("RECEPCIONISTA", "MEDICO"), getDoctorsHandler); // la raiz de api doctors solo entrar RECEPCIONISTA y MEDICO
router.get("/:id/appointments", verifyToken, authorize("MEDICO"), getDoctorAgendaHandler); // url de id de medico y sus citas agendadas solo lo ve MEDICO
router.get("/:id/dates", verifyToken, authorize("MEDICO"), getDoctorAgendaHandler); //  url mas chiquita de id de medico y sus citas 

export default router;//exporta todo este mapa para index 

