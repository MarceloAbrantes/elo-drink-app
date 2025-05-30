// delete-test.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.contact.delete({
    where: { id: 1 }, // change to an existing ID
  });
  console.log('Deleted:', deleted);
}

main()
  .catch((e) => {
    console.error('Error deleting:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });