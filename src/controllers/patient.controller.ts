import { Request, Response } from "express";
import * as PatientModel from "../models/patient.model.js";

export const createPatientHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevo = await PatientModel.createPatient(req.body);
    res.status(201).json(nuevo);
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "El correo ya se encuentra registrado" });
      return;
    }
    res.status(500).json({ message: "Error al registrar el paciente" });
  }
};

export const getPatientsHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const lista = await PatientModel.getAllPatients();
    res.json(lista);
  } catch {
    res.status(500).json({ message: "Error al obtener la lista de pacientes" });
  }
};

export const getPatientByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "El ID del paciente debe ser un número entero" });
      return;
    }

    const paciente = await PatientModel.getPatientById(id);
    if (!paciente) {
      res.status(404).json({ message: "Paciente no encontrado" });
      return;
    }

    res.json(paciente);
  } catch {
    res.status(500).json({ message: "Error al consultar el expediente del paciente" });
  }
};
