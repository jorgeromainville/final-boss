export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Clínica Salud Integral",
    version: "1.0.0",
    description: "Documentación interactiva de la API para la Clínica Salud Integral (Stack PERN con Prisma 7, Express y JWT)",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local de desarrollo",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Autenticación"],
        summary: "Registrar un nuevo usuario (ADMIN, MEDICO, RECEPCIONISTA)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password", "rol"],
                properties: {
                  email: { type: "string", example: "usuario@clinica.com" },
                  password: { type: "string", example: "secreto123" },
                  rol: { type: "string", enum: ["ADMINISTRADOR", "MEDICO", "RECEPCIONISTA", "GERENCIA"], example: "RECEPCIONISTA" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Usuario registrado con éxito" },
          409: { description: "El correo ya está en uso" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Autenticación"],
        summary: "Iniciar sesión y obtener token JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "admin@clinica.com" },
                  password: { type: "string", example: "admin123" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Token generado con éxito" },
          401: { description: "Credenciales incorrectas" },
        },
      },
    },
    "/api/patients": {
      get: {
        tags: ["Pacientes"],
        summary: "Listar todos los pacientes (Recepcionista)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de pacientes" },
          401: { description: "No autenticado" },
          403: { description: "No autorizado" },
        },
      },
      post: {
        tags: ["Pacientes"],
        summary: "Registrar un nuevo paciente",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nombre", "apellido", "email", "fechaNacimiento"],
                properties: {
                  nombre: { type: "string", example: "Juan" },
                  apellido: { type: "string", example: "Perez" },
                  email: { type: "string", example: "juan.perez@email.com" },
                  fechaNacimiento: { type: "string", example: "1990-05-15" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Paciente creado" },
          400: { description: "Error de validación (Zod)" },
          409: { description: "Correo duplicado" },
        },
      },
    },
    "/api/patients/{id}": {
      get: {
        tags: ["Pacientes"],
        summary: "Obtener expediente del paciente con historial de citas y médicos",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Expediente completo" },
          404: { description: "Paciente no encontrado" },
        },
      },
    },
    "/api/doctors": {
      get: {
        tags: ["Médicos"],
        summary: "Listar médicos (filtro opcional ?specialty=)",
        parameters: [
          {
            name: "specialty",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Nombre de la especialidad",
          },
        ],
        responses: {
          200: { description: "Directorio médico" },
        },
      },
    },
    "/api/appointments": {
      post: {
        tags: ["Citas"],
        summary: "Agendar una cita médica (Recepcionista)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["pacienteId", "medicoId", "fechaCita"],
                properties: {
                  pacienteId: { type: "integer", example: 1 },
                  medicoId: { type: "integer", example: 1 },
                  fechaCita: { type: "string", example: "2026-12-01T10:00:00.000Z" },
                  motivo: { type: "string", example: "Chequeo preventivo" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Cita agendada" },
          400: { description: "Fecha en el pasado o error de validación" },
          404: { description: "Médico o paciente inexistente" },
        },
      },
    },
    "/api/appointments/{id}/status": {
      patch: {
        tags: ["Citas"],
        summary: "Actualizar estado de la cita a COMPLETADA o CANCELADA (Médico)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["estado"],
                properties: {
                  estado: { type: "string", enum: ["COMPLETADA", "CANCELADA"], example: "COMPLETADA" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Estado actualizado" },
          400: { description: "Estado inválido" },
          404: { description: "Cita no encontrada" },
        },
      },
    },
    "/api/reports/appointments-by-specialty": {
      get: {
        tags: ["Reportes"],
        summary: "Citas totales por especialidad médica (Gerencia)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Reporte de especialidades" },
          403: { description: "Requiere rol GERENCIA" },
        },
      },
    },
    "/api/reports/daily-cutoff": {
      get: {
        tags: ["Reportes"],
        summary: "Corte diario de citas completadas y canceladas (Gerencia)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "date",
            in: "query",
            required: true,
            schema: { type: "string", example: "2026-11-10" },
            description: "Fecha en formato YYYY-MM-DD",
          },
        ],
        responses: {
          200: { description: "Corte diario de operaciones" },
          403: { description: "Requiere rol GERENCIA" },
        },
      },
    },
  },
};
