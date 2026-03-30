// @ts-nocheck
import request from "supertest";
import { app } from "../src/api.js";
import prisma from "../src/prisma.js";

describe("Validações – Users API", () => {
  let userId = null;

  beforeAll(async () => {
    const res = await request(app).post("/users").send({
      name: "Teste Validação",
      email: "validacao@teste.com",
      password: "Senha123",
      phone: "(16)99999-9999",
      CPF: "52998224725",
    });

    if (res.status === 201) {
      userId = res.body.id;
    }
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: "validacao@teste.com" },
    });
    await prisma.$disconnect();
  });

  it("CREATE-USER-01 – Deve rejeitar criação sem email", async () => {
    const res = await request(app).post("/users").send({
      name: "Usuário Sem Email",
      email: null,
      password: "Senha123",
      phone: "(16)99999-9999",
      CPF: "52998224725",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("AUTH-USER-02 – Deve rejeitar autenticação com senha errada", async () => {
    const res = await request(app).post("/users/auth").send({
      email: "validacao@teste.com",
      senha: "senhaErrada123",
    });

    expect([401, 404]).toContain(res.status);
  });

  it("GET-USER-03 – Buscar usuário inexistente", async () => {
    const res = await request(app).get("/users/99999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("UPDATE-USER-04 – Deve rejeitar email como número", async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ email: 12345 });

    expect([400, 401, 404, 500]).toContain(res.status);
  });

  it("DELETE-USER-05 – Deve rejeitar deleção de usuário inexistente", async () => {
    const res = await request(app).delete("/users/99999");

    expect([401, 404]).toContain(res.status);
  });
});
