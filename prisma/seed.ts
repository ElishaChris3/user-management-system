import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: "Ada Lovelace", email: "ada@example.com", role: Role.ADMIN },
    { name: "Grace Hopper", email: "grace@example.com", role: Role.EDITOR },
    { name: "Alan Turing", email: "alan@example.com", role: Role.VIEWER },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u
    });
  }
  console.log("Seeded demo users.");
}

main().finally(async () => await prisma.$disconnect());
