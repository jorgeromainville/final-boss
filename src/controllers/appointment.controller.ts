import { Request, Response } from "express";
import * as AppointmentModel from "../models/appointment.model.js";
import prisma from "../config/prisma.js";

export const createAppointmentHandler = async (req: Request, res: Response): Promise<void> => {//exporta la funcion crear cita
  try {
    const { pacienteId, medicoId, fechaCita, motivo } = req.body;//obtiene los datos de la cita

    const paciente = await prisma.paciente.findUnique({ where: { id: pacienteId } });//busca el paciente
    if (!paciente) {//si no existe el paciente
      res.status(404).json({ message: "El paciente no existe" });//envia un mensaje de error
      return;
    }

    const medico = await prisma.medico.findUnique({ where: { id: medicoId } });//busca el medico
    if (!medico) {//si no existe el medico
      res.status(404).json({ message: "El medico no existe" });//envia un mensaje de error
      return;
    }

    const cita = await AppointmentModel.createAppointment({//crea la cita
      pacienteId,
      medicoId,
      fechaCita: new Date(fechaCita),//convierte la fecha a objeto Date
      motivo,
    });

    res.status(201).json(cita); //retorna la cita creada
  } catch {//atrapa lo que salio mal y
    res.status(500).json({ message: "Error al agendar la cita" });//retorna un mensaje de error
  }
};

export const getDoctorAgendaHandler = async (req: Request, res: Response): Promise<void> => {//exporta la funcion agenda del medico
  try {
    const medicoId = parseInt(req.params.id as string, 10); //convierte el id a numero
    if (isNaN(medicoId)) {//si el id no es un numero
      res.status(400).json({ message: "ID de medico invalido" });//envia un mensaje de error
      return;
    }

    const fromQuery = req.query.from as string | undefined;//obtiene la fecha inicial
    const toQuery = req.query.to as string | undefined;//obtiene la fecha final

    let from: Date | undefined;//define la fecha inicial
    let to: Date | undefined;//define la fecha final

    if (fromQuery && toQuery) {//si la fecha inicial y la fecha final existen
      from = new Date(fromQuery);//convierte la fecha inicial a objeto Date
      to = new Date(toQuery);//convierte la fecha final a objeto Date
    }

    const agenda = await AppointmentModel.getDoctorAgenda(medicoId, from, to);//obtiene la agenda del medico
    res.json(agenda); //retorna la agenda
  } catch {//atrapa lo que salio mal y
    res.status(500).json({ message: "Error al obtener la agenda" });//retorna un mensaje de error
  }
};

export const updateAppointmentStatusHandler = async (req: Request, res: Response): Promise<void> => {//exporta la funcion actualizar estado de la cita
  try {
    const id = parseInt(req.params.id as string, 10); //convierte el id a numero
    if (isNaN(id)) {//si el id no es un numero
      res.status(400).json({ message: "ID de cita invalido" });//envia un mensaje de error
      return;
    }

    const actualizada = await AppointmentModel.updateAppointmentStatus(id, req.body.estado);//actualiza el estado de la cita
    res.json(actualizada);//retorna la cita actualizada
  } catch (error: any) {//atrapa lo que salio mal y
    if (error.code === "P2025") {//si el error es P2025
      res.status(404).json({ message: "Cita no encontrada" });//envia un mensaje de error
      return;
    }
    res.status(500).json({ message: "Error al actualizar la cita" });//retorna un mensaje de error
  }
};
