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

route.post('/',UserControler.store);

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
 */
route.get('/', UserControler.index);


route.get('/:id',UserControler.show);
route.delete('/:id', verificaToken, verificaRole('UserDelete'),UserControler.delete);
route.put('/:id', verificaToken, verificaRole('UserUpdate'),UserControler.put);
route.post('/aunt', UserControler.aunt)

export default route;