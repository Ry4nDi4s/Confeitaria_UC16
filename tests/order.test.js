import request from 'supertest';
import { app } from '../src/api.js';

describe("Sistema de Pedidos - Confeitaria", () => {
  it("Deve criar um novo pedido", async () => {
    const response = await request(app)
      .post('/orders')  
      .send({
        customerName: "João Silva",
        items: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 }
        ]
      });   

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.customerName).toBe("João Silva");
    expect(response.body.items.length).toBe(2);
  });

  it("Deve listar todos os pedidos", async () => {
    const response = await request(app).get('/orders'); 
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Deve atualizar o status de um pedido", async () => {
    const createResponse = await request(app)
      .post('/orders')
      .send({
        customerName: "Maria Souza",
        items: [
          { productId: 3, quantity: 1 }
        ]
      });
    const orderId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/orders/${orderId}/status`)
      .send({ status: "Em preparo" });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.status).toBe("Em preparo");
  });

  it("Deve deletar um pedido", async () => {
    const createResponse = await request(app)
      .post('/orders')
      .send({
        customerName: "Carlos Pereira",
        items: [
          { productId: 4, quantity: 3 }
        ]
      });
    const orderId = createResponse.body.id;
    const deleteResponse = await request(app).delete(`/orders/${orderId}`);
    expect(deleteResponse.status).toBe(204);
  });

  it("Deve retornar 404 para pedido não encontrado", async () => {
    const response = await request(app).get('/orders/9999'); 
    expect(response.status).toBe(404);
  });

  it("Deve retornar 400 para dados de pedido inválidos", async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        customerName: "",
        items: []
      });
    expect(response.status).toBe(400);
  });

  
  
});

