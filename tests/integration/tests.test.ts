import { Discipline, Term } from "@prisma/client";
import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import loginFactory from "../factories/loginFactory";
import testBodyFactory from "../factories/testBodyFactory";
import { truncateUsers, disconnect } from "./users.test.js";

type TestByDiscipline = Term & {
  disciplines: Discipline[];
};

type GetTestsBody = {
  tests: TestByDiscipline[]
}

describe("GET /tests", () => {
  beforeEach(truncateUsers);
  beforeAll(disconnect);
  it("should return 200 and tests given a valid token", async () => {
    const { body: { token } } = await loginFactory();

    const { 
      status,
      body: { tests } 
    }: { 
      status: number,
      body: GetTestsBody
    } = await supertest(app)
      .get("/tests")
      .query({ groupBy: "disciplines" })
      .set("Authorization", `Bearer ${token}`);

    expect(status).toEqual(200);
    expect(tests.length).toBeGreaterThan(0);
  });
  
  it("should return 401 given a invalid token", async () => {
    const { status } = await supertest(app)
      .get("/tests")
      .query({ groupBy: "disciplines" })
      .set("Authorization", `Bearer ${"invalid token"}`);
      
      
    expect(status).toEqual(401);
  });
});

describe("POST /tests", () => {
  beforeEach(truncateUsers);
  beforeAll(disconnect);
  it("should return 201 and persist given valid token and valid test", async () => {
    const { body: { token } } = await loginFactory();
    const test = testBodyFactory();

    const { status } = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", `Bearer ${token}`);


    const testCreated = await prisma.test.findFirst({
      where: {
        name: test.name 
      }
    });

    expect(status).toEqual(201);
    expect(testCreated).not.toBeNull();
  });

  it("should return 422 given a invalid body", async () => {
    const { body: { token } } = await loginFactory();
    const test = {};
    
    const { status } = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", `Bearer ${token}`);
      
      
    expect(status).toEqual(422);
  });
});

describe("PATCH /tests", () => {
  it("should return 200 and increment by one the test view given a valid testId and a valid token", async () => {
    const { body: { token } } = await loginFactory();
    
    const testBeforePatch = await prisma.test.findFirst({
      where: {
        id: 1 
      }
    });
    
    const { status } = await supertest(app)
    .patch("/tests/1/views")
    .set("Authorization", `Bearer ${token}`);
    
    const testAfterPatch = await prisma.test.findFirst({
      where: {
        id: 1 
      }
    });
    
    expect(status).toEqual(201);
    expect(testAfterPatch.views).toEqual(testBeforePatch.views + 1);
  });
});

export async function truncateTests() {
  await prisma.$queryRaw`TRUNCATE TABLE tests`;
}