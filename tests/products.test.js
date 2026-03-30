// @ts-nocheck
import request from "supertest";
import { app } from "../src/api.js";
import prisma from "../src/prisma.js";

describe("Produtos - Backend", () => {
  afterAll(async () => {
    await prisma.product.deleteMany({
      where: {
        slug: {
          contains: "brigadeiro"
        }
      }
    });
    await prisma.$disconnect();
  });

  it("Criar produto com sucesso", async () => {
    const res = await request(app).post("/products").send({
      name: "Brigadeiro",
      description: "Docinho tradicional",
      preco: 5.5,
      tipo: "docinho",
      slug: "brigadeiro",
      quantify: 10,
      stock: 10,
      maturity: "2026-12-31",
      foto: "brigadeiro.jpg"
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Brigadeiro");
  });

  it("Criar produto com preço negativo (comportamento atual)", async () => {
    const res = await request(app).post("/products").send({
      name: "Produto Inválido",
      description: "Erro",
      preco: -5,
      tipo: "docinho",
      slug: "produto-invalido",
      quantify: 10,
      stock: 10,
      maturity: "2026-12-31",
      foto: "erro.jpg"
    });

    // Backend NÃO valida preço negativo
    expect(res.status).toBe(201);
  });
});
