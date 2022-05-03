import { faker } from "@faker-js/faker";
import { CreateTestData } from "../../src/services/testService";

export default function testBodyFactory(): CreateTestData {
  return {
    name: faker.internet.domainName(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1,
  };
}