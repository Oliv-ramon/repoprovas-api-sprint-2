import testRepository from "../repositories/testRepository.js";

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

export default {
  find,
};
