import { Request, Response } from "express";
import * as PatientModel from "../models/patient.model.js";

export const createPatientHandler = async (req: Request, res: Response): Promise<void> => {//crea el controlador para crear pacientes
  try {
    const nuevo = await PatientModel.createPatient(req.body);//exporta desde el modelo para crear al paciente
    res.status(201).json(nuevo);//si todo bien da 200
  } catch (error: any) {// lo atrapa si hay error 
    if (error.code === "P2002") {// si el correo ya esta registrado en BD
      res.status(409).json({ message: "El correo ya se encuentra registrado" });//da 409
      return;
    }
    res.status(500).json({ message: "Error al registrar el paciente" });//si no es ese error da 500
  }
};

export const getPatientsHandler = async (_req: Request, res: Response): Promise<void> => {//controlador para traer a todos los pacientes
  try {
    const lista = await PatientModel.getAllPatients();//trae todos los pacientes de BD
    res.json(lista);//da una lista con todos los pacientes en JSON
  } catch {//atrapa error
    res.status(500).json({ message: "Error al obtener la lista de pacientes" });//da 500 si no se puede obtener la lista
  }
};

export const getPatientByIdHandler = async (req: Request, res: Response): Promise<void> => {//controlador para traer paciente por id
  try {
    const id = parseInt(req.params.id as string, 10);//convierte el id de string en la URL a entero
    if (isNaN(id)) {//si el id no es un numero ejemplo "uno" en lugar de 1
      res.status(400).json({ message: "El ID del paciente debe ser un número entero" });//da 400
      return;
    }

    const paciente = await PatientModel.getPatientById(id);//trae el paciente por id
    if (!paciente) {//si no encuentra el paciente
      res.status(404).json({ message: "Paciente no encontrado" });//da 404
      return;
    }

    res.json(paciente);//da el paciente en JSON
  } catch {//atrapa error si algo sale mal
    res.status(500).json({ message: "Error al consultar el expediente del paciente" });//da 500
  }
};

