import { Test } from "@prisma/client";
import { prisma } from "../database.js";

async function getTestsByDiscipline() {
  return prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getFilteredTestsByDiscipline(disciplineName: string) {
  return prisma.term.findMany({
    where: {
      disciplines: {
        some: {
          name: {
            contains: disciplineName
          }
        }
      }
    },
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getTestsByTeachers() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

async function getFilteredTestsByTeachers(teacherName: string) {
  return prisma.teacherDiscipline.findMany({
    where: {
      teacher: {
        name: {
          contains: teacherName
        }
      }
    },
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });
}

export type CreateTestData = Partial<Test>;

function updateOrInsertTest(test: Test | CreateTestData) {
  return prisma.test.upsert({
    where: {
      id: test.id
    },
    create: {
      ...test as Test
    },
    update: {
      views: test.views++
    }
  });
}

export default {
  getTestsByDiscipline,
  getFilteredTestsByDiscipline,
  getTestsByTeachers,
  getFilteredTestsByTeachers,
  updateOrInsertTest,
};
