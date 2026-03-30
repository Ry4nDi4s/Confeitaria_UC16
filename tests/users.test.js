// @ts-nocheck

import request from "supertest";
import { describe, it, expect, afterAll } from "@jest/globals";
import { app } from "../src/api.js";
import prisma from "../src/prisma.js";

describe("Users API", () => {
  let userId = null;

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: "teste@exemplo.com" }
    });
    await prisma.$disconnect();
  });

  it("Cria usuário válido", async () => {
    const response = await request(app).post("/users").send({
      name: "Usuário Teste",
      email: "teste@exemplo.com",
      password: "Senha123",
      phone: "(16)99999-9999",
      CPF: "52998224725"
    });

    expect(response.status).toBe(201);
    userId = response.body.id;
    expect(userId).toBeDefined();
  });

  it("Atualiza usuário", async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({ name: "Usuário Atualizado" });

    expect(response.status).toBe(200);

    const dbUpdated = await prisma.user.findUnique({
      where: { id: userId }
    });

    expect(dbUpdated).not.toBeNull();
  });

  it("Deleta usuário", async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.status).toBe(200);
  });
});