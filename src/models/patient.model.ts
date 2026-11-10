import prisma from "../config/prisma.js";
import { CreatePatientInput } from "../schemas/patientSchema.js";

export const createPatient = (data: CreatePatientInput) => {
  return prisma.paciente.create({ data });
};

export const getAllPatients = () => {
  return prisma.paciente.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getPatientById = (id: number) => {
  return prisma.paciente.findUnique({
    where: { id },
    include: {
      citas: {
        include: {
          medico: {
            include: { especialidad: true },
          },
        },
        orderBy: { fechaCita: "desc" },
      },
    },
  });
};

