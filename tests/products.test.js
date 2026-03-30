const request = require('supertest');
const app = require('../src/app'); 

describe('Produtos - Backend', () => {
  
  describe('Criar produtos', () => {
    
    it('Criar docinho com sucesso', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          nome: 'Brigadeiro',
          categoria: 'docinho',
          preco: 3.50,
          quantidade: 100,
          validade: '2025-12-31'
        });

      expect(res.status).toBe(201);
      expect(res.body.nome).toBe('Brigadeiro');
      expect(res.body.categoria).toBe('docinho');
    });

    it('Criar bolo com sucesso', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          nome: 'Bolo de Chocolate',
          categoria: 'bolo',
          preco: 45.90,
          quantidade: 10,
          validade: '2025-12-31'
        });

      expect(res.status).toBe(201);
      expect(res.body.nome).toBe('Bolo de Chocolate');
      expect(res.body.categoria).toBe('bolo');
    });
  });

  describe('Validar preço', () => {
    
    it('Rejeitar preço negativo', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          nome: 'Brigadeiro',
          categoria: 'docinho',
          preco: -5.00,
          quantidade: 100,
          validade: '2025-12-31'
        });

      expect(res.status).toBe(400);
    });

    it('Aceitar preço válido', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          nome: 'Brigadeiro',
          categoria: 'docinho',
          preco: 3.50,
          quantidade: 100,
          validade: '2025-12-31'
        });

      expect(res.status).toBe(201);
    });
  });
});