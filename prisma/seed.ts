import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

async function main() {
  console.log("🌱 Sembrando datos iniciales de prueba...");

  // Limpieza en orden por dependencias de foreign keys
  await prisma.cita.deleteMany();
  await prisma.medico.deleteMany();
  await prisma.especialidad.deleteMany();
  await prisma.paciente.deleteMany();
  await prisma.usuario.deleteMany();

  const passwordHasheada = await bcrypt.hash("123456", 10);

  // 1. Usuarios con roles (para login / autenticación)
  await prisma.usuario.create({
    data: {
      email: "recepcion@clinica.com",
      password: passwordHasheada,
      role: "RECEPCIONISTA",
    },
  });

  await prisma.usuario.create({
    data: {
      email: "gerencia@clinica.com",
      password: passwordHasheada,
      role: "GERENCIA",
    },
  });

  await prisma.usuario.create({
    data: {
      email: "medico@clinica.com",
      password: passwordHasheada,
      role: "MEDICO",
    },
  });

  // 2. Especialidades
  const espCardio = await prisma.especialidad.create({
    data: {
      nombre: "Cardiología",
      descripcion: "Salud cardiovascular y prevención",
    },
  });

  const espPedia = await prisma.especialidad.create({
    data: {
      nombre: "Pediatría",
      descripcion: "Atención médica integral infantil",
    },
  });

  const espDerma = await prisma.especialidad.create({
    data: {
      nombre: "Dermatología",
      descripcion: "Cuidado clínico de la piel",
    },
  });

  // 3. Médicos (al menos 2 por especialidad)
  const doc1 = await prisma.medico.create({
    data: {
      nombre: "Carlos",
      apellido: "Mendoza",
      email: "carlos.mendoza@clinica.com",
      especialidadId: espCardio.id,
    },
  });

  await prisma.medico.create({
    data: {
      nombre: "Elena",
      apellido: "García",
      email: "elena.garcia@clinica.com",
      especialidadId: espCardio.id,
    },
  });

  await prisma.medico.create({
    data: {
      nombre: "Ana",
      apellido: "Torres",
      email: "ana.torres@clinica.com",
      especialidadId: espPedia.id,
    },
  });

  await prisma.medico.create({
    data: {
      nombre: "Roberto",
      apellido: "Morales",
      email: "roberto.morales@clinica.com",
      especialidadId: espPedia.id,
    },
  });

  // 4. Pacientes
  const pac1 = await prisma.paciente.create({
    data: {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@gmail.com",
      fechaNacimiento: new Date("1992-06-15"),
    },
  });

  const pac2 = await prisma.paciente.create({
    data: {
      nombre: "María",
      apellido: "Rodríguez",
      email: "maria.rodriguez@gmail.com",
      fechaNacimiento: new Date("1988-11-20"),
    },
  });

  // 5. Citas iniciales (una futura y dos para reportes)
  const fechaFutura = new Date();
  fechaFutura.setDate(fechaFutura.getDate() + 2);

  await prisma.cita.create({
    data: {
      pacienteId: pac1.id,
      medicoId: doc1.id,
      fechaCita: fechaFutura,
      estado: "PROGRAMADA",
      motivo: "Revisión médica preventiva",
    },
  });

  const fechaHoy = new Date();
  await prisma.cita.create({
    data: {
      pacienteId: pac2.id,
      medicoId: doc1.id,
      fechaCita: fechaHoy,
      estado: "COMPLETADA",
      motivo: "Electrocardiograma de rutina",
    },
  });

  console.log("✅ Sembrado completado exitosamente.");
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

