import { TeacherDiscipline } from "@prisma/client";
import teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

async function findOrFail(teacherDiscipline: Omit<TeacherDiscipline, "id">) {
  const existingTeacherDiscipline = await teacherDisciplineRepository
    .findByTeacherIdAndDisciplineId(teacherDiscipline);
  
  if (!existingTeacherDiscipline) {
    throw { message: "this teacher don't teach this discipline" }; 
  }

  return existingTeacherDiscipline;
}

export default {
  findOrFail,
}