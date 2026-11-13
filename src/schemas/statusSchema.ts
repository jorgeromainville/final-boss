import { z } from "zod";//Importa zod

export const updateStatusSchema = z.object({//exporta el schema
  estado: z.enum(["COMPLETADA", "CANCELADA"], {//dolo admite estos dos estado si no es asi manda error
    errorMap: () => ({ message: "El estado solo puede ser 'COMPLETADA' o 'CANCELADA'" }),
  }),
});

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;// exporta y tipea el schema a ts (magia de zod)



