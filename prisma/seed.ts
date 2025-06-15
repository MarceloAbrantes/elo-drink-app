const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const localPrisma = new PrismaClient(); // <- renomeada para evitar conflito

async function main() {
  const hashedPassword = await bcrypt.hash("senha123", 10);

  const existing = await localPrisma.admin.findUnique({
    where: { email: "admin@elo.com" },
  });

  if (!existing) {
    await localPrisma.admin.create({
      data: {
        name: "Admin Teste",
        email: "admin@elo.com",
        password: hashedPassword,
      },
    });

    console.log("✅ Admin criado com sucesso!");
  } else {
    console.log("⚠️ Admin já existe.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Erro:", e);
  })
  .finally(() => localPrisma.$disconnect());