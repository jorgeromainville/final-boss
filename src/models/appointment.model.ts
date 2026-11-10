import prisma from "../config/prisma.js";
import { CreateAppointmentInput } from "../schemas/appointmentSchema.js";
import { UpdateStatusInput } from "../schemas/statusSchema.js";

export const createAppointment = (data: CreateAppointmentInput) => {
  return prisma.cita.create({
    data: {
      ...data,
      estado: "PROGRAMADA",
    },
    include: {
      paciente: true,
      medico: { include: { especialidad: true } },
    },
  });
};

export const getDoctorAgenda = (medicoId: number, from?: Date, to?: Date) => {
  return prisma.cita.findMany({
    where: {
      medicoId,
      ...(from && to ? { fechaCita: { gte: from, lte: to } } : {}),
    },
    include: { paciente: true },
    orderBy: { fechaCita: "asc" },
  });
};

export const getAppointmentById = (id: number) => {
  return prisma.cita.findUnique({
    where: { id },
  });
};

export const updateAppointmentStatus = (id: number, estado: UpdateStatusInput["estado"]) => {
  return prisma.cita.update({
    where: { id },
    data: { estado },
  });
};
