import { prisma } from "../src/database.js";
import dotenv from "dotenv";
dotenv.config();

async function seed() {
  await prisma.term.createMany({
    data: [
      { id: 1, number: 1 },
      { id: 2, number: 2 },
    ]
  });

  await prisma.category.createMany({
    data: [
      { id: 1, name: "P1" },
      { id: 2, name: "P2" },
      { id: 3, name: "P3" },
    ]
  });

  await prisma.discipline.createMany({
    data: [
      { id: 1, name: "Html", termId: 1 },
      { id: 2, name: "Css", termId: 2 },
      { id: 3, name: "JS", termId: 1 },
    ]
  });

  await prisma.teacher.createMany({
    data: [
      { id: 1, name: "Dina" },
      { id: 2, name: "Pedrão" },
    ]
  });

  await prisma.teacherDiscipline.createMany({
    data: [
      { id: 1, teacherId: 1, disciplineId: 1 },
      { id: 2, teacherId: 1, disciplineId: 3 },
      { id: 3, teacherId: 2, disciplineId: 2 },
    ]
  });

  await prisma.test.createMany({
    data: [
      {
        id: 1,
        name: "Globo.com",
        pdfUrl: "https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2017/08/CBPFOT070720170188-550x366.jpg",
        categoryId: 2,
        teacherDisciplineId: 1,
      },
      {
        name: "Instagram",
        pdfUrl: "https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2017/08/CBPFOT070720170188-550x366.jpg",
        categoryId: 2,
        teacherDisciplineId: 3,
      },
      {
        name: "Parrots",
        pdfUrl: "https://blogs.correiobraziliense.com.br/nqv/wp-content/uploads/sites/22/2017/08/CBPFOT070720170188-550x366.jpg",
        categoryId: 3,
        teacherDisciplineId: 2,
      },
    ]
  });
}

async function clearDb() {
  await prisma.test.deleteMany({});
  await prisma.teacherDiscipline.deleteMany({});
  await prisma.discipline.deleteMany({});
  await prisma.teacher.deleteMany({});
  await prisma.term.deleteMany({});
  await prisma.category.deleteMany({});
}

process.env.SEED_OPTION === "seed" ? await seed() : await clearDb();