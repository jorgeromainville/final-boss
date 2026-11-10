import { Request, Response } from "express";
import * as ReportModel from "../models/report.model.js";

export const getSpecialtyReportHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const report = await ReportModel.getAppointmentsBySpecialty();
    res.json(report);
  } catch {
    res.status(500).json({ message: "Error al generar reporte de citas por especialidad" });
  }
};

export const getDailyCutoffHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const date = req.query.date as string;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ message: "Parámetro 'date' obligatorio en formato YYYY-MM-DD" });
      return;
    }

    const report = await ReportModel.getDailyCutoff(date);
    res.json(report);
  } catch {
    res.status(500).json({ message: "Error al generar corte operativo diario" });
  }
};
