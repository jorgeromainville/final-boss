import prisma from "../config/prisma.js";

export const getAllDoctors = (nombreEspecialidad?: string) => {
  return prisma.medico.findMany({
    where: nombreEspecialidad
      ? {
          especialidad: {
            nombre: { equals: nombreEspecialidad, mode: "insensitive" },
          },
        }
      : undefined,
    include: { especialidad: true },
    orderBy: { apellido: "asc" },
  });
};

export const getDoctorById = (id: number) => {
  return prisma.medico.findUnique({
    where: { id },
    include: { especialidad: true },
  });
};

export const getAllSpecialties = () => {
  return prisma.especialidad.findMany({
    orderBy: { nombre: "asc" },
  });
};

