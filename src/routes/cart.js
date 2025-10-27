import { Router } from 'express';
import { CartController } from '../controllers/cart.js';

const route = Router();

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Adiciona um item ao carrinho
 *     description: Cria um novo item no carrinho de compras vinculando um produto a um pedido existente.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantify
 *               - orderId
 *               - produtoId
 *             properties:
 *               quantify:
 *                 type: integer
 *                 description: Quantidade do produto a ser adicionada no carrinho.
 *                 example: 3
 *               orderId:
 *                 type: integer
 *                 description: ID do pedido (order) ao qual o item será vinculado.
 *                 example: 1
 *               produtoId:
 *                 type: integer
 *                 description: ID do produto que será adicionado ao carrinho.
 *                 example: 5
 *     responses:
 *       201:
 *         description: Item adicionado ao carrinho com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 8
 *                 quantify:
 *                   type: integer
 *                   example: 3
 *                 orderId:
 *                   type: integer
 *                   example: 1
 *                 produtoId:
 *                   type: integer
 *                   example: 5
 *       301:
 *         description: Erros (Pedido ou produto)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pedido não encontrado | Produto não encontrado"
 */
route.post('/', CartController.store);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Lista os itens do carrinho
 *     description: Retorna todos os itens do carrinho. É possível filtrar por quantidade (`quantify`) usando query params.
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: quantify
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filtra os itens do carrinho pela quantidade.
 *         example: 2
 *     responses:
 *       200:
 *         description: Lista de itens do carrinho retornada com sucesso
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
 *                   quantify:
 *                     type: integer
 *                     example: 2
 *                   orderId:
 *                     type: integer
 *                     example: 1
 *                   produtoId:
 *                     type: integer
 *                     example: 5
 */
route.get('/', CartController.index);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Busca um item do carrinho pelo ID
 *     description: Retorna os dados de um item específico do carrinho com base no seu ID.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item do carrinho a ser buscado
 *         example: 1
 *     responses:
 *       200:
 *         description: Item do carrinho encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 quantify:
 *                   type: integer
 *                   example: 2
 *                 orderId:
 *                   type: integer
 *                   example: 1
 *                 produtoId:
 *                   type: integer
 *                   example: 5
 */
route.get('/:id', CartController.index);
route.delete('/:id', CartController.del);
route.put('/:id', CartController.update);



export default route;