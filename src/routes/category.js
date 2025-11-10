import { Router } from "express";
import { CategoryController } from "../controllers/category.js";


/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Endpoints para gerenciamento de categoria
 */
const CategoryRoutes = Router();


/**
 * @swagger
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     description: Adiciona uma nova categoria de produtos no sistema, incluindo nome, slug e URL automática da imagem.
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria.
 *                 example: "Bolos de anivesário"
 *               slug:
 *                 type: string
 *                 description: Identificador único da categoria (usado na URL e para gerar o nome da imagem).
 *                 example: "eletronicos"
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 12
 *                 name:
 *                   type: string
 *                   example: "Bolos de aniversário"
 *                 slug:
 *                   type: string
 *                   example: "bolos de aniversário"
 *                 photoUrl:
 *                   type: string
 *                   example: "/static/categories/photos/eletronicos.png"
 */
CategoryRoutes.post("/", CategoryController.store);


/**
 * @swagger
 * /category:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista com todas as categorias cadastradas no sistema.
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *                   name:
 *                     type: string
 *                     example: "bolos de aniversário"
 *                   slug:
 *                     type: string
 *                     example: "bolos de aniversário"
 *                   photoUrl:
 *                     type: string
 *                     example: "/static/categories/photos/boloaniversário.png"
 */
CategoryRoutes.get("/", CategoryController.index);


/**
 * @swagger
 * /category/by-slug/{slug}/products:
 *   get:
 *     summary: Lista os produtos de uma categoria específica
 *     description: Retorna todos os produtos vinculados a uma categoria identificada pelo seu slug.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug (identificador único) da categoria.
 *         example: "eletronicos"
 *     responses:
 *       200:
 *         description: Lista de produtos da categoria retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   name:
 *                     type: string
 *                     example: "Bolos Fixos"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 99.90
 *                   description:
 *                     type: string
 *                     example: "bolo de chocolate"
 *                   photoUrl:
 *                     type: string
 *                     example: "/static/products/photos/bolochocolate.png"
 *                   categoryId:
 *                     type: integer
 *                     example: 3
 *       404:
 *         description: Categoria inexistente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Categoria inexistente"
 */
CategoryRoutes.get("/by-slug/:slug/products", CategoryController.indexProducts);


export default CategoryRoutes;