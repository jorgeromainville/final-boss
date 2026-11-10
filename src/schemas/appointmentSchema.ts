import { z } from "zod";

export const createAppointmentSchema = z.object({
  pacienteId: z.number().int().positive("El pacienteId debe ser un número entero positivo"),
  medicoId: z.number().int().positive("El medicoId debe ser un número entero positivo"),
  fechaCita: z.coerce
    .date()
    .min(new Date(), "No puedes agendar una cita en una fecha u hora que ya pasó"),
  motivo: z.string().trim().max(255, "El motivo no puede superar 255 caracteres").optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
