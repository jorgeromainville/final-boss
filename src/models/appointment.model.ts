import prisma from "../config/prisma.js"; //importe prisma para interactuar con la BD
import { CreateAppointmentInput } from "../schemas/appointmentSchema.js"; //importa el schema de cita
import { UpdateStatusInput } from "../schemas/statusSchema.js"; //importa el schema de estado

export const createAppointment = (data: CreateAppointmentInput) => {//exporta la funcion crear cita
  return prisma.cita.create({//guarda la nueva cita con estado programada
    data: {
      ...data,
      estado: "PROGRAMADA",
    },
    include: {//include es para que se muestren los datos:
      paciente: true,//paciente
      medico: { include: { especialidad: true } },//medico y su especialidad
    },
  });
};

export const getDoctorAgenda = (medicoId: number, from?: Date, to?: Date) => {//exporta la funcion agenda del medico
  return prisma.cita.findMany({//busca todas las citas del medico
    where: {//donde las citas son del medico
      medicoId,
      ...(from && to ? { fechaCita: { gte: from, lte: to } } : {}),//y si hay fecha de inicio y fin, busca las citas en ese rango
    },
    include: { paciente: true },//incluye el paciente
    orderBy: { fechaCita: "asc" },//ordena por fecha de cita ascendente
  });
};

export const getAppointmentById = (id: number) => {//exporta la funcion buscar cita por id
  return prisma.cita.findUnique({//busca la cita por id
    where: { id },
  });
};

export const updateAppointmentStatus = (id: number, estado: UpdateStatusInput["estado"]) => {//exporta la funcion actualizar estado de la cita
  return prisma.cita.update({
    where: { id },//donde las citas son del medico
    data: { estado },//y el estado es el que se pasa como parametro
  });
};

