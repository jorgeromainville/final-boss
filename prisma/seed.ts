import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

async function main() {
  await prisma.cita.deleteMany();
  await prisma.medico.deleteMany();
  await prisma.especialidad.deleteMany();
  await prisma.paciente.deleteMany();
  await prisma.usuario.deleteMany();

  const passwordHasheada = await bcrypt.hash("123456", 10);

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

  const espCardio = await prisma.especialidad.create({
    data: {
      nombre: "Cardiología",
      descripcion: "Salud cardiovascular",
    },
  });

  const espPedia = await prisma.especialidad.create({
    data: {
      nombre: "Pediatría",
      descripcion: "Atención médica infantil",
    },
  });

  const espDerma = await prisma.especialidad.create({
    data: {
      nombre: "Dermatología",
      descripcion: "Cuidado de la piel",
    },
  });

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
      motivo: "Consulta general",
    },
  });

  console.log("Datos de prueba sembrados");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
