import { Router } from 'express';
import { PaymentControler } from '../controllers/paymant.js'

/**
 * @swagger
 * tags:
 *   name: Paymant
 *   description: Endpoints para gerenciamento de pagamento
 */
const route = Router();

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Cria um novo pagamento
 *     description: Cria um pagamento no sistema. É possível pagar via cartão, pix ou dinheiro. Se informado cartão, ele será validado.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               card:
 *                 type: string
 *                 example: "4111111111111111"
 *                 description: Número do cartão de crédito (opcional)
 *               pix:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *                 description: Chave Pix (opcional)
 *               money:
 *                 type: boolean
 *                 example: true
 *                 description: Pagamento em dinheiro (opcional)
 *               value:
 *                 type: number
 *                 format: float
 *                 example: 100.50
 *                 description: Valor do pagamento
 *               scheduling:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-25T15:30:00Z"
 *                 description: Data de agendamento do pagamento (opcional)
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 card:
 *                   type: string
 *                   example: "4111111111111111"
 *                 pix:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 money:
 *                   type: boolean
 *                   example: true
 *                 value:
 *                   type: number
 *                   format: float
 *                   example: 100.50
 *                 scheduling:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-25T15:30:00Z"
 *       400:
 *         description: Erro (cartão)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Cartão inválido"
 */
route.post('/', PaymentControler.store);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Lista todos os pagamentos
 *     description: Retorna todos os pagamentos cadastrados. É possível filtrar por valor ou data de agendamento usando query parameters.
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: value
 *         schema:
 *           type: number
 *           format: float
 *         description: Filtra pagamentos pelo valor
 *         example: 100.50
 *       - in: query
 *         name: scheduling
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filtra pagamentos pela data de agendamento
 *         example: "2025-10-25T15:30:00Z"
 *     responses:
 *       200:
 *         description: Lista de pagamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   card:
 *                     type: string
 *                     example: "4111111111111111"
 *                   pix:
 *                     type: string
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   money:
 *                     type: boolean
 *                     example: true
 *                   value:
 *                     type: number
 *                     format: float
 *                     example: 100.50
 *                   scheduling:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-25T15:30:00Z"
 */
route.get('/', PaymentControler.index);


route.get('/:id', PaymentControler.show);


route.delete('/:id', PaymentControler.delete);


route.put('/:id', PaymentControler.put);


route.put('/:id',PaymentControler.put);

export default route;

