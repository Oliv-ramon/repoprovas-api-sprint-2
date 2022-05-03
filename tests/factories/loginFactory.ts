import supertest from "supertest";
import app from "../../src/app.js";
import userBodyFactory from "./userBodyFactory.js";
import userFactory from "./userFactory.js";

export default async function loginFactory() {
  const user = userBodyFactory();
  await userFactory(user);

  return supertest(app).post("/sign-in").send(user);;
}