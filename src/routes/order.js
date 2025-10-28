import { Router } from 'express';
import { OrderController } from '../controllers/order.js';
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Rotas para gerenciamento de pedidos
 */
const route = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         which_product:
 *           type: string
 *           example: "Bolo de Chocolate"
 *         who_order:
 *           type: string
 *           example: "Gabriel"
 *         value:
 *           type: number
 *           example: 49.90
 *         quantify:
 *           type: integer
 *           example: 2
 *         delivery_day:
 *           type: string
 *           format: date
 *           example: "2025-10-30"
 *         userId:
 *           type: integer
 *           example: 3
 *         paymentId:
 *           type: integer
 *           example: 1
 */
route.post('/', verificaToken,OrderController.store);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - which_product
 *               - who_order
 *               - value
 *               - quantify
 *               - delivery_day
 *             properties:
 *               which_product:
 *                 type: string
 *                 example: "Cupcake"
 *               who_order:
 *                 type: string
 *                 example: "Maria"
 *               value:
 *                 type: number
 *                 example: 15.5
 *               quantify:
 *                 type: integer
 *                 example: 6
 *               delivery_day:
 *                 type: string
 *                 example: "2025-11-02"
 *               userId:
 *                 type: integer
 *                 example: 2
 *               paymentId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Erro nos dados enviados
 */
route.get('/', verificaToken,OrderController.index);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retorna um pedido específico pelo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Pedido não encontrado
 */
route.get('/:id', verificaToken, OrderController.show);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Exclui um pedido existente
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido a ser excluído
 *     responses:
 *       200:
 *         description: Pedido excluído com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
route.delete('/:id',verificaToken, verificaRole('OrderDelete'), OrderController.del);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Atualiza um pedido existente
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               value: 59.90
 *               quantify: 3
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o pedido
 */
route.put('/:id',verificaToken, verificaRole('OrderUpdate'), OrderController.put)

export default route;