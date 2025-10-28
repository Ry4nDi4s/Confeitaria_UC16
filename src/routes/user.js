import { Router } from "express";
import { UserControler } from "../controllers/user.js";
import { verificaToken } from "../middlewares/auth.js";
import verificaRole from "../middlewares/roles.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gerenciamento de usuários
 */
const route = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Registra um novo usuário no sistema com validação de email, senha, telefone e CPF.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - CPF
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *               phone:
 *                 type: string
 *                 example: "(11)98765-4321"
 *               CPF:
 *                 type: string
 *                 example: "123.456.789-00"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
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
 *                   example: João da Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *                 phone:
 *                   type: string
 *                   example: "(11)98765-4321"
 *                 CPF:
 *                   type: string
 *                   example: "123.456.789-00"
 *       400:
 *         description: Erros de validação (email, senha, telefone, CPF)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email inválido | Senha fraca | Telefone inválido | CPF inválido"
*/
route.post('/', UserControler.store);

/**
 * @swagger
 * /users/aunt:
 *   post:
 *     summary: Autentica um usuário
 *     description: Valida email e senha do usuário e retorna um token JWT válido por 8 horas.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Autenticação realizada com sucesso, token retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Erro de login (senha)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro na senha"
 *       404:
 *         description: Erro no login (email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro no Email"
 */
route.post('/aunt', UserControler.aunt)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
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
 *                   name:
 *                     type: string
 *                     example: João
 *                   email:
 *                     type: string
 *                     example: joaosilvao@gmail.com
 *                   phone:
 *                     type: string
 *                     example: "(16)99979-9695" 
 *                   CPF:
 *                     type: string
 *                     example: 121.468.932.70
 */
route.get('/', UserControler.index);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     description: Retorna os dados de um usuário específico com base no seu ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do usuário a ser buscado.
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
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
 *                   example: João da Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *                 phone:
 *                   type: string
 *                   example: "(16)98765-4321"
 *                 CPF:
 *                   type: string
 *                   example: "123.456.789-00"
 *       404:
 *         description: Erro (usuário)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado"
 */
route.get('/:id',UserControler.show);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     description: Exclui um usuário existente no sistema usando o ID fornecido. Requer autenticação e permissão de exclusão.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # indica que essa rota precisa de token JWT Bearer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser excluído
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
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
 *                   example: João da Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *                 phone:
 *                   type: string
 *                   example: "(16)98765-4321"
 *                 CPF:
 *                   type: string
 *                   example: "123.456.789-00"
 *       404:
 *         description: Erro (usuário)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado"
 */
route.delete('/:id', verificaToken, verificaRole('UserDelete'),UserControler.delete);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     description: Permite atualizar o nome, email e telefone de um usuário existente pelo ID. Requer autenticação e permissão de atualização.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # indica que essa rota precisa de token JWT Bearer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
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
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               phone:
 *                 type: string
 *                 example: "(11)98765-4321"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
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
 *                   example: João da Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *                 phone:
 *                   type: string
 *                   example: "(11)98765-4321"
 *       401:
 *         description: Erro (token ou autetificação)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Token não enviado | Não autenticado"
 *       403:
 *         description: erro (Token, Acesso, Usuário)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: " Token Invalido ou expirado | Acesso negado | O usuário não possui permissão "
 *       404:
 *         description: Erro (usuário)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado"
 */
route.put('/:id', verificaToken, verificaRole('UserUpdate'),UserControler.put);

export default route;