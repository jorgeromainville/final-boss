import { z } from "zod";// importa Zod completo

export const createAppointmentSchema = z.object({//exporta la estructura de JSON que esperamos recivir
  pacienteId: z.number().int().positive("El pacienteId debe ser un número entero positivo"),//numero entero positivo
  medicoId: z.number().int().positive("El medicoId debe ser un número entero positivo"),//numero entero positivo
  fechaCita: z.coerce //transforma el tipo texto a Date de JS
    .date()// dee tipo fecha
    .min(new Date(), "No puedes agendar una cita en una fecha u hora que ya pasó"),// minimo la hora/fecha actual o futura
  motivo: z.string().trim().max(255, "El motivo no puede superar 255 caracteres").optional(),//tripo texto, con contenido maximo de 255 caracteres
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;//clonamos el esquema de Zod a ts (magia)

