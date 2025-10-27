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

route.post('/', verificaToken,OrderController.store);
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