// @ts-nocheck
import request from "supertest";
import { app } from "../src/api.js";
import prisma from "../src/prisma.js";

describe("Users API", () => {
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: "teste@exemplo.com" }
    });
    await prisma.$disconnect();
  });

  it("Deve criar usuário válido", async () => {
    const res = await request(app).post("/users").send({
      name: "Usuário Teste",
      email: "teste@exemplo.com",
      password: "Senha123",
      phone: "(16)99999-9999",
      CPF: "52998224725"
    });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("teste@exemplo.com");
  });

  it("Deve listar usuários", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});