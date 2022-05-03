import { TeacherDiscipline, Test } from "@prisma/client";

import testRepository from "../repositories/testRepository.js";
import teacherDisciplineService from "./teacherDisciplineService.js";

interface Filters { 
  groupBy: string, 
  disciplineName: string; 
  teacherName: string; 
}

async function find(filter: Filters) {
  if (filter.groupBy === "disciplines") {
    if (filter.disciplineName) {
      return testRepository.getFilteredTestsByDiscipline(filter.disciplineName);
    }

    return testRepository.getTestsByDiscipline();
  } else if (filter.groupBy === "teachers") {
    if (filter.teacherName) {
      return testRepository.getFilteredTestsByTeachers(filter.teacherName);
    }

    return testRepository.getTestsByTeachers();
  }
}

export type CreateTestData = 
  Omit<Test, "id" | "teacherDisciplineId" | "views"> & 
  Omit<TeacherDiscipline, "id"> 

async function create({
  name,
  pdfUrl,
  categoryId,
  disciplineId,
  teacherId
}: CreateTestData) {
  const { id: teacherDisciplineId } = await teacherDisciplineService.findOrFail({
    disciplineId,
    teacherId,
  });
  
  const newTest = {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId
  };

  return  testRepository.create(newTest);
}

function updateViews(testId: number) {
  return testRepository.updateViews(testId);
}

export default {
  find,
  updateViews,
  create,
};
