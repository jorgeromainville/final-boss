import { z } from "zod";//importa Zod

export const createPatientSchema = z.object({//exporta el schema de creacion de paciente
  nombre: z//valida el nombre
    .string()//que sea texto
    .trim()//elimina los espacios en blanco al inicio y al final
    .min(2, "El nombre debe tener al menos 2 caracteres")//nombre tenga al menos 2 caracteres
    .max(100, "El nombre no puede superar los 100 caracteres"),//maximo 100
  apellido: z//valida el apellido (igual que arriba)
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido no puede superar los 100 caracteres"),
  email: z//valida el email
    .string()
    .trim()
    .email("El formato del correo electrónico no es válido"),// que sea en formato correo (maravilla de zod)
  fechaNacimiento: z.coerce//convierte la fecha a objeto Date
    .date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura"),// no puede ser futura
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;//tipea el schema a ts (magia de zod)

