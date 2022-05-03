import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import userBodyFactory from "../factories/userBodyFactory.js";
import userFactory from "../factories/userFactory.js";

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

describe("POST /sign-in", () => {
  it("should return 200 and a token given valid credencials", async () => {
    const user = userBodyFactory();

    await userFactory(user);

    const { status, body } = await supertest(app).post("/sign-in").send(user);

    expect(status).toEqual(200);
    expect(typeof(body.token)).toEqual("string");
    expect(body.token.length).toBeGreaterThan(0);
  });

  it("should return 401 given invalid email", async () => {
    const user = userBodyFactory();
    
    const { status } = await supertest(app).post("/sign-in").send(user);

    expect(status).toEqual(401);
  });

  it("should return 401 given invalid password", async () => {
    const user = userBodyFactory();

    await userFactory(user);
    
    const { status } = await supertest(app).post("/sign-in").send({
      ...user,
      password: "invalid password"
    });

    expect(status).toEqual(401);
  });  

  it("should return 422 given invalid body", async () => {
    const user = {};
    
    const { status } = await supertest(app).post("/sign-in").send(user);

    expect(status).toEqual(422);
  });  
});

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$queryRaw`TRUNCATE TABLE users`;
}
