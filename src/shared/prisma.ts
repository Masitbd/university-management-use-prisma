import { PrismaClient } from '@prisma/client';
const Prisma = new PrismaClient({
  errorFormat: 'minimal',
});

export default Prisma;
