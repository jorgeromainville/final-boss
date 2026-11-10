import { z } from "zod";

export const updateStatusSchema = z.object({
  estado: z.enum(["COMPLETADA", "CANCELADA"], {
    errorMap: () => ({ message: "El estado solo puede ser 'COMPLETADA' o 'CANCELADA'" }),
  }),
});

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;

