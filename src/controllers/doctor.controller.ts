import { Request, Response } from "express";
import * as DoctorModel from "../models/doctor.model.js";

export const getDoctorsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const especialidad = req.query.specialty as string | undefined;
    const medicos = await DoctorModel.getAllDoctors(especialidad);
    res.json(medicos);
  } catch {
    res.status(500).json({ message: "Error al obtener directorio de médicos" });
  }
};

export const getSpecialtiesHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const especialidades = await DoctorModel.getAllSpecialties();
    res.json(especialidades);
  } catch {
    res.status(500).json({ message: "Error al obtener las especialidades" });
  }
};

