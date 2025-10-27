import { Router } from 'express';
import { ReceitaControler } from '../controllers/receita.js';
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';


/**
 * @swagger
 * tags:
 *   name: Receitas
 *   description: Rotas de gerenciamento das receitas da confeitaria
 */

const route = Router();

/**
 * @swagger
 * /receitas:
 *   post:
 *     summary: Cria uma nova receita
 *     description: Registra uma nova receita no sistema. Verifica se o ingrediente e o produto informados existem antes da criação.
 *     tags: [Receitas]
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
 *                 example: Massa de bolo de chocolate
 *               description:
 *                 type: string
 *                 example: Receita base para bolos de chocolate
 *               quantify:
 *                 type: number
 *                 example: 5
 *               stock:
 *                 type: number
 *                 example: 20
 *               maturity:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-01"
 *               ingredientId:
 *                 type: integer
 *                 example: 1
 *               produtoId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Receita criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 1
 *                 name: Massa de bolo de chocolate
 *                 description: Receita base para bolos de chocolate
 *                 quantify: 5
 *                 stock: 20
 *                 maturity: "2025-12-01T00:00:00.000Z"
 *       301:
 *         description: Ingrediente ou produto informado não existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: "Ingrediente não identificado"
 *       400:
 *         description: Erro nos dados enviados
 */

route.post('/', verificaToken,  verificaRole('ReceitaPost'), ReceitaControler.store);
/**
 * @swagger
 * /receitas:
 *   get:
 *     summary: Lista todas as receitas
 *     description: Retorna todas as receitas cadastradas, com suporte a filtros opcionais por nome, descrição ou quantidade.
 *     tags: [Receitas]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra receitas pelo nome
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Filtra receitas pela descrição
 *       - in: query
 *         name: quantify
 *         schema:
 *           type: number
 *         description: Filtra receitas pela quantidade
 *     responses:
 *       200:
 *         description: Lista de receitas retornada com sucesso
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

route.get('/', ReceitaControler.index);

/**
 * @swagger
 * /receitas/{id}:
 *   get:
 *     summary: Busca uma receita pelo ID
 *     description: Retorna uma receita específica pelo ID informado.
 *     tags: [Receitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da receita
 *     responses:
 *       200:
 *         description: Receita encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 id: 1
 *                 name: Massa de bolo de chocolate
 *                 description: Receita base para bolos de chocolate
 *                 quantify: 5
 *                 stock: 20
 *                 maturity: "2025-12-01"
 *       404:
 *         description: Receita não encontrada
 */

route.get('/:id', ReceitaControler.show);

/**
 * @swagger
 * /receitas/{id}:
 *   delete:
 *     summary: Exclui uma receita
 *     description: Remove uma receita pelo seu ID. Acesso restrito a usuários autorizados.
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da receita a ser removida
 *     responses:
 *       200:
 *         description: Receita excluída com sucesso
 *       404:
 *         description: Receita não encontrada
 */
route.delete('/:id', verificaToken, verificaRole('ReceitaDelete'),ReceitaControler.delete);

/**
 * @swagger
 * /receitas/{id}:
 *   put:
 *     summary: Atualiza uma receita existente
 *     description: Atualiza parcialmente ou completamente uma receita existente (acesso restrito).
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da receita a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Massa de bolo simples
 *               description:
 *                 type: string
 *                 example: Receita base para bolos simples
 *               quantify:
 *                 type: number
 *                 example: 10
 *               stock:
 *                 type: number
 *                 example: 50
 *               maturity:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-15"
 *     responses:
 *       200:
 *         description: Receita atualizada com sucesso
 *       404:
 *         description: Receita não encontrada
 */
route.put('/:id', verificaToken, verificaRole('ReceitaUpdate'),ReceitaControler.put);


export default route;