import { Router } from 'express';
import { ProductController } from '../controllers/product.js';
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';

// Ajustar Verifica Token em product e role em post


const route = Router();
route.post('/', verificaToken, verificaRole('PostProduct'),ProductController.store);
route.get('/', ProductController.index);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     description: Retorna os dados de um produto específico com base no seu ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser buscado.
 *         example: 1
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Bolo de amêndoa"
 *                 description:
 *                   type: string
 *                   example: "amêndua "
 *                 quantify:
 *                   type: integer
 *                   example: 2
 *                 stock:
 *                   type: integer
 *                   example: 3
 *                 maturity:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-31"
 *                 foto:
 *                   type: string
 *                   example: "http://site.com/foto.png"
 *                 preco:
 *                   type: number
 *                   format: float
 *                   example: 100
 *       404:
 *         description: Erro (produto)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Produto não encontrado"
 */
route.get('/:id', ProductController.show);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Exclui um produto pelo ID
 *     description: Remove um produto específico do banco de dados com base no seu ID. 
 *                  É necessário estar autenticado e possuir a permissão `ProductDelete`.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser excluído.
 *         example: 1
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Bolo de amêndoa"
 *                 description:
 *                   type: string
 *                   example: "amêndua"
 *                 quantify:
 *                   type: integer
 *                   example: 2
 *                 stock:
 *                   type: integer
 *                   example: 3
 *                 maturity:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-31"
 *                 foto:
 *                   type: string
 *                   example: "http://site.com/foto.png"
 *                 preco:
 *                   type: number
 *                   format: float
 *                   example: 100
 *       401:
 *         description: Erro (Token ou autentificação)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Token não enviado | Não autenticado"
 *       403:
 *         description: Erros (Token, Acesso, Permissão )
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Token inválido ou expirado | Acesso negado | Usuário não possui permissão "
 *       404:
 *         description: Erro (produto)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Produto não encontrado"
 */
route.delete('/:id', verificaToken, verificaRole('ProductDelete'),ProductController.delete);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     description: Atualiza os dados de um produto específico com base no seu ID. 
 *                  É necessário estar autenticado e possuir a permissão `ProductUpdate`.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser atualizado.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bolo de chocolate"
 *               description:
 *                 type: string
 *                 example: "Bolo de chocolate com cobertura"
 *               quantify:
 *                 type: integer
 *                 example: 5
 *               stock:
 *                 type: integer
 *                 example: 10
 *               maturity:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-30"
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Bolo de Morango"
 *                 description:
 *                   type: string
 *                   example: "Nihno com morango"
 *                 quantify:
 *                   type: integer
 *                   example: 2
 *                 stock:
 *                   type: integer
 *                   example: 4
 *                 maturity:
 *                   type: string
 *                   format: date
 *                   example: "2025-11-30"
 *                 foto:
 *                   type: string
 *                   example: "http://site.com/foto.png"
 *                 preco:
 *                   type: number
 *                   format: float
 *                   example: 150
 *       401:
 *         description: (Token ou autentificação)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Token não enviado | Não autenticado"
 *       403:
 *         description: Erros (Token, Acesso, Usuário)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Acesso negado | Token inválido | Usuário não possui acesso"
 *       404:
 *         description: Erro (produto)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Produto não encontrado"
 */
route.put('/:id', verificaToken, verificaRole('ProductUpdate'), ProductController.update);


export default route;