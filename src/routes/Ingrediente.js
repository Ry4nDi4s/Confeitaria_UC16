import { Router } from 'express';
import { IngredienteController } from '../controllers/ingrediente.js'
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';

/**
 * @swagger
 * tags:
 *   name: Ingredientes
 *   description: Rotas de gerenciamento de ingredientes
 */
const route = Router();

/**
 * @swagger
 * /ingredientes:
 *   post:
 *     summary: Cria um novo ingrediente
 *     description: Registra um novo ingrediente no sistema (acesso restrito).
 *     tags: [Ingredientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - quantify
 *               - stock
 *               - maturity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Farinha
 *               description:
 *                 type: string
 *                 example: Ingrediente base para bolos
 *               quantify:
 *                 type: number
 *                 example: 20
 *               stock:
 *                 type: number
 *                 example: 100
 *               maturity:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-01"
 *     responses:
 *       201:
 *         description: Ingrediente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 1
 *                 name: Farinha
 *                 description: Ingrediente base para bolos
 *                 quantify: 20
 *                 stock: 100
 *                 maturity: "2025-12-01T00:00:00.000Z"
 *       400:
 *         description: Erro nos dados enviados
 */
route.post('/', verificaToken, verificaRole('IngredientePost'), IngredienteController.store);

/**
 * @swagger
 * /ingredientes:
 *   get:
 *     summary: Lista todos os ingredientes
 *     description: Retorna uma lista de todos os ingredientes, com suporte a filtros opcionais por nome, quantidade ou descrição.
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra ingredientes pelo nome
 *       - in: query
 *         name: quantify
 *         schema:
 *           type: number
 *         description: Filtra ingredientes pela quantidade
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Filtra ingredientes pela descrição
 *     responses:
 *       200:
 *         description: Lista de ingredientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   quantify:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   maturity:
 *                     type: string
 *                     format: date
 */
route.get('/', IngredienteController.index);

/**
 * @swagger
 * /ingredientes/{id}:
 *   get:
 *     summary: Busca um ingrediente pelo ID
 *     description: Retorna um ingrediente específico pelo seu ID.
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ingrediente
 *     responses:
 *       200:
 *         description: Ingrediente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 1
 *                 name: Farinha
 *                 description: Ingrediente base para bolos
 *                 quantify: 20
 *                 stock: 100
 *                 maturity: "2025-12-01"
 *       400:
 *         description: Ingrediente não encontrado
 */
route.get('/:id', IngredienteController.show);

/**
 * @swagger
 * /ingredientes/{id}:
 *   delete:
 *     summary: Exclui um ingrediente
 *     description: Remove permanentemente um ingrediente pelo ID (acesso restrito).
 *     tags: [Ingredientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ingrediente a ser removido
 *     responses:
 *       200:
 *         description: Ingrediente removido com sucesso
 *       404:
 *         description: Ingrediente não encontrado
 */
route.delete('/:id', verificaToken, verificaRole('IngredienteDelete'), IngredienteController.del);

/**
 * @swagger
 * /ingredientes/{id}:
 *   put:
 *     summary: Atualiza um ingrediente
 *     description: Atualiza parcialmente os dados de um ingrediente (acesso restrito).
 *     tags: [Ingredientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ingrediente a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Açúcar refinado
 *               quantify:
 *                 type: number
 *                 example: 30
 *               stock:
 *                 type: number
 *                 example: 80
 *               description:
 *                 type: string
 *                 example: Açúcar branco usado em bolos e doces
 *               maturity:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-10"
 *     responses:
 *       200:
 *         description: Ingrediente atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar ingrediente
 */
route.put('/:id', verificaToken, verificaRole('IngredienteUpdate'), IngredienteController.put)

//alo
export default route;