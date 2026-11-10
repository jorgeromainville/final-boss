import { Request, Response } from "express";
import * as AppointmentModel from "../models/appointment.model.js";
import prisma from "../config/prisma.js";

export const createAppointmentHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pacienteId, medicoId, fechaCita, motivo } = req.body;

    const paciente = await prisma.paciente.findUnique({ where: { id: pacienteId } });
    if (!paciente) {
      res.status(404).json({ message: "El paciente no existe" });
      return;
    }

    const medico = await prisma.medico.findUnique({ where: { id: medicoId } });
    if (!medico) {
      res.status(404).json({ message: "El medico no existe" });
      return;
    }

    const cita = await AppointmentModel.createAppointment({
      pacienteId,
      medicoId,
      fechaCita: new Date(fechaCita),
      motivo,
    });

    res.status(201).json(cita);
  } catch {
    res.status(500).json({ message: "Error al agendar la cita" });
  }
};

export const getDoctorAgendaHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const medicoId = parseInt(req.params.id as string, 10);
    if (isNaN(medicoId)) {
      res.status(400).json({ message: "ID de medico invalido" });
      return;
    }

    const fromQuery = req.query.from as string | undefined;
    const toQuery = req.query.to as string | undefined;

    let from: Date | undefined;
    let to: Date | undefined;

    if (fromQuery && toQuery) {
      from = new Date(fromQuery);
      to = new Date(toQuery);
    }

    const agenda = await AppointmentModel.getDoctorAgenda(medicoId, from, to);
    res.json(agenda);
  } catch {
    res.status(500).json({ message: "Error al obtener la agenda" });
  }
};

export const updateAppointmentStatusHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID de cita invalido" });
      return;
    }

    const actualizada = await AppointmentModel.updateAppointmentStatus(id, req.body.estado);
    res.json(actualizada);
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }
    res.status(500).json({ message: "Error al actualizar la cita" });
  }
};
