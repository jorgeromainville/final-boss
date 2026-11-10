import prisma from "../config/prisma.js";

// Reporte 1: Total citas por especialidad usando $queryRaw seguro
export const getAppointmentsBySpecialty = () => {
  return prisma.$queryRaw<Array<{ specialty: string; total_appointments: number }>>`
    SELECT e.nombre AS specialty, COUNT(c.id)::int AS total_appointments
    FROM citas c
    INNER JOIN medicos m ON m.id = c.id_medico
    INNER JOIN especialidades e ON e.id = m.id_especialidad
    GROUP BY e.nombre
    ORDER BY total_appointments DESC
  `;
};

// Reporte 2: Corte operativo diario usando groupBy nativo de Prisma
export const getDailyCutoff = async (date: string) => {
  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  return prisma.cita.groupBy({
    by: ["estado"],
    where: {
      fechaCita: { gte: startOfDay, lte: endOfDay },
      estado: { in: ["COMPLETADA", "CANCELADA"] },
    },
    _count: { estado: true },
  });
};

