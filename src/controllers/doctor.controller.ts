import { Request, Response } from "express";
import * as DoctorModel from "../models/doctor.model.js"; // importa todas * las funciones de DoctorModel

export const getDoctorsHandler = async (req: Request, res: Response): Promise<void> => {
  //exporta la funcion, async=tarda un tiempito en ejecutarse, (recibe y devuelve) no devuelve un valor si no un res.json(..)
  try {// si todo sale bien intenta ejecutar esto
    const especialidad = req.query.specialty as string | undefined;// si no hay nada en el query es undefined
    const medicos = await DoctorModel.getAllDoctors(especialidad);//esperaaaa a que termine de buscar y me guarde lo que encontro en medicos
    res.json(medicos);//manda los medicos como json
  } catch {//atrapa si algo sale mal o falla manda codigo http 500
    res.status(500).json({ message: "Error al obtener directorio de médicos" });
  }
};

export const getSpecialtiesHandler = async (_req: Request, res: Response): Promise<void> => {
  //exporta la funcion, async=tarda un tiempito en ejecutarse, (recibe? y devuelve) no devuelve un valor si no un res.json(..)
  try {// si todo sale bien intenta ejecutar esto
    const especialidades = await DoctorModel.getAllSpecialties();//esperaaaa a que termine de buscar y me guarde lo que encontro en especialidades
    res.json(especialidades);//manda las especialidades como json
  } catch {//atrapa si algo sale mal o falla manda codigo http 500
    res.status(500).json({ message: "Error al obtener las especialidades" });
  }
};

