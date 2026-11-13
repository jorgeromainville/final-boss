import { Request, Response } from "express";
import * as ReportModel from "../models/report.model.js";

export const getSpecialtyReportHandler = async (_req: Request, res: Response): Promise<void> => {//controlador del reporte de citas por especialidad
  try {//intenta generar el reporte de citas por especialidad
    const report = await ReportModel.getAppointmentsBySpecialty();
    res.json(report);
  } catch {//si hay un error, muestra el error
    res.status(500).json({ message: "Error al generar reporte de citas por especialidad" });
  }
};

export const getDailyCutoffHandler = async (req: Request, res: Response): Promise<void> => {//controlador del cierre diario de citas
  try {//intenta generar el cierre diario de citas
    const date = req.query.date as string;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {//valida que el parametro date sea obligatorio y este en formato YYYY-MM-DD
      res.status(400).json({ message: "Parámetro 'date' obligatorio en formato YYYY-MM-DD" });
      return;
    }

    const report = await ReportModel.getDailyCutoff(date);//obtiene el cierre diario de citas
    res.json(report);//muestra el cierre diario de citas
  } catch {//si hay un error, muestra el error
    res.status(500).json({ message: "Error al generar corte operativo diario" });
  }
};

