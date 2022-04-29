import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database.js";
import userBodyFactory from "./factories/userBodyFactory.js";

describe("POST /sign-up", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);
  
  it("should return 201 and persist the user given a valid body", async () => {
    const body = userBodyFactory();

    const { status } = await supertest(app).post("/sign-up").send(body);
    const userCreated = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    expect(status).toEqual(201);
    expect(userCreated).not.toBeNull();
  });

  it("should return 422 given a invalid body", async () => {
    const body = {};

    const { status } = await supertest(app).post("/sign-up").send(body);

    expect(status).toEqual(422);
  });

  it("should return 409 given a duplicate email", async () => {
    const body = userBodyFactory();

    await supertest(app).post("/sign-up").send(body);
    const { status } = await supertest(app).post("/sign-up").send(body);
    
    const usersCreated = await prisma.user.findMany({
      where: {
        email: body.email
      }
    });

    expect(status).toEqual(409);
    expect(usersCreated.length).toEqual(1);
  });
});

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$queryRaw`TRUNCATE TABLE users`;
}
