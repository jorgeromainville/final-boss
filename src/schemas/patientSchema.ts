import { z } from "zod";

export const createPatientSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  apellido: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido no puede superar los 100 caracteres"),
  email: z
    .string()
    .trim()
    .email("El formato del correo electrónico no es válido"),
  fechaNacimiento: z.coerce
    .date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura"),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
