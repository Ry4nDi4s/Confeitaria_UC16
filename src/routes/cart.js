import { Router } from 'express';
import { CartController } from '../controllers/cart.js';
import { verificaToken } from '../middlewares/auth.js';

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Endpoints para gerenciamento de carrinho
 */

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

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Remove um item do carrinho pelo ID
 *     description: Deleta um item específico do carrinho com base no seu ID. É necessário estar autenticado.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []   # se você estiver usando JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item do carrinho a ser removido
 *         example: 1
 *     responses:
 *       200:
 *         description: Item do carrinho removido com sucesso
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
 *       401:
 *          description: Erro (Token)
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token não enviado"
 *       403:
 *         description: Erro (Token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 *       404:
 *         description: Erro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "não encontrado"
 */
route.delete('/:id', verificaToken, CartController.del);

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Atualiza um item do carrinho pelo ID
 *     description: Atualiza os dados de um item específico do carrinho com base no seu ID. Atualmente, é possível atualizar `quantify`, `orderId` e `produtoId`.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item do carrinho a ser atualizado
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantify:
 *                 type: integer
 *                 example: 1
 *               orderId:
 *                 type: integer
 *                 example: 9
 *               produtoId:
 *                 type: integer
 *                 example: 9
 *     responses:
 *       200:
 *         description: Item do carrinho atualizado com sucesso
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
 *                   example: 5
 *                 orderId:
 *                   type: integer
 *                   example: 9
 *                 produtoId:
 *                   type: integer
 *                   example: 9
 *       404:
 *         description: Carrinho não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Carrinho não encontrado"
 */
route.put('/:id', CartController.update);


export default route;