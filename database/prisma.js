import { PrismaClient } from "@prisma/client";

const prismaClientReader = new PrismaClient({
  log: ["query"],
});

const prisma = { prismaClientReader };

export default prisma;
