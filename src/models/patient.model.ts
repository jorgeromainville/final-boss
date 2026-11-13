import prisma from "../config/prisma.js";
import { CreatePatientInput } from "../schemas/patientSchema.js";

export const createPatient = (data: CreatePatientInput) => {//guarda un paciente en la BD
  return prisma.paciente.create({ data });
};

export const getAllPatients = () => {//trae todos los pacientes de la BD 
  return prisma.paciente.findMany({
    orderBy: { createdAt: "desc" },//ordenados por fecha de creacion descendente
  });
};

export const getPatientById = (id: number) => {//trae el pasiente por id
  return prisma.paciente.findUnique({
    where: { id },//donde id
    include: {//incluye las:
      citas: {//citas
        include: {//incluye:
          medico: {//el medico
            include: { especialidad: true },//la especialidad
          },
        },
        orderBy: { fechaCita: "desc" },//ordenados por fecha de creacion descendente
      },
    },
  });
};
