import prisma from "../config/prisma.js";

export const getAppointmentsBySpecialty = () => {//exporta la funcion de obtener citas por especialidad
  //se usa SQL
  return prisma.$queryRaw<Array<{ specialty: string; total_appointments: number }>>`
    SELECT e.nombre AS specialty, COUNT(c.id)::int AS total_appointments
    FROM citas c
    INNER JOIN medicos m ON m.id = c.id_medico
    INNER JOIN especialidades e ON e.id = m.id_especialidad
    GROUP BY e.nombre
    ORDER BY total_appointments DESC
  `;
};

export const getDailyCutoff = async (date: string) => {//obtiene el cierre diario de citas
  const startOfDay = new Date(`${date}T00:00:00.000Z`);//define el inicio del dia
  const endOfDay = new Date(`${date}T23:59:59.999Z`);//define el fin del dia
  //agrupa las citas por estado y cuenta las citas que estan completadas o canceladas
  return prisma.cita.groupBy({
    by: ["estado"],
    where: {
      fechaCita: { gte: startOfDay, lte: endOfDay },
      estado: { in: ["COMPLETADA", "CANCELADA"] },
    },
    _count: { estado: true },
  });
};
