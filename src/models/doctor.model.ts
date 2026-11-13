import prisma from "../config/prisma.js"; //traer el objeto prisma para hablar con labase de datos

export const getAllDoctors = (nombreEspecialidad?: string) => { //crear la funcion traer todos los doctores
  return prisma.medico.findMany({ //retorna la tabla medicos y uso findMany en vez de SELECT * FROM medicos
    where: nombreEspecialidad //filtrar por especialidad
      ? { // si es verdadro aplica el filtro
          especialidad: { 
            nombre: { equals: nombreEspecialidad, mode: "insensitive" }, // nombre de la especialidad sin importar mayusculas o minusculas
          },
        }
      : undefined, // si es falso traer todos los medicos
    include: { especialidad: true }, // en vez de poner el id pone el nombre de la especialidad (remplaza a JOIN)
    orderBy: { apellido: "asc" }, //ordenar por apellido de forma ascendente
  });
};

export const getDoctorById = (id: number) => { // crea la funcion de trer un solo doctor po su id
  return prisma.medico.findUnique({// retorna la tabla de medico y uso findUnique en vez de SELECT *
    where: { id }, // busca el que coincida con el id
    include: { especialidad: true },// lo mismo que arriba no pone solo el id si no el nombre
  });
};

export const getAllSpecialties = () => {// crear la funcion de traer todas las especialidades
  return prisma.especialidad.findMany({ // uso findMany para traer todas las especialidades de la tabla
    orderBy: { nombre: "asc" },// ordena el nombre de forma ascendente
  });
};

// todas estas funciones las trae el controller para poder usarlas

