import { TeacherDiscipline } from "@prisma/client";
import { prisma } from "../database.js";

function findByTeacherIdAndDisciplineId(
  { teacherId, disciplineId }: Omit<TeacherDiscipline, "id">
) {
  return prisma.teacherDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId
    }
  });
}

export default {
  findByTeacherIdAndDisciplineId,
};
