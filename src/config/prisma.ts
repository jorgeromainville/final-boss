import "dotenv/config";//importa mi .env
import { PrismaPg } from "@prisma/adapter-pg";//adaptador de prisma
import { PrismaClient } from "../../generated/prisma/client";//importa los modelos para hacer consultas

const connectionString = `${process.env.DATABASE_URL}`;//la url de mi BD y lo guarda en connectionString

const adapter = new PrismaPg({ connectionString });//adapta prisma a posgresSQL
const prisma = new PrismaClient({ adapter });//conecta para hacer consultas

//exporta de 2 formas para no confundirse por el tipado de {}
export { prisma };
export default prisma;

