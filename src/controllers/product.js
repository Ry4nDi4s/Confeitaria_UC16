import { Decimal } from "@prisma/client/runtime/library";
import { slugify } from "../utils/slugify.js";
import prisma from "../prisma.js";

// C - CREATE, INSERT, POST, SET, STORE

// asincrona nome_da_função(recebendo, responder, proximo)
export const ProductController = {
async store(req, res, _next) {
  try {
    console.log("BODY RECEBIDO:", req.body);

    const {
      description,
      name,
      quantify,
      stock,
      maturity,
      foto,
      preco,
      tipo,
      isActive,
      categoryId,
    } = req.body;

    const baseSlug = slugify(name);
    let newSlug = baseSlug;
    let count = 1;

    while (await prisma.product.findUnique({ where: { slug: newSlug } })) {
      newSlug = `${baseSlug}-${count++}`;
    }

    console.log("SLUG GERADO:", newSlug);

    const productCreate = await prisma.product.create({
      data: {
        description,
        name,
        quantify: Number(quantify),
        stock: Number(stock),
        maturity: new Date(maturity),
        foto,
        preco: new Decimal(preco),
        tipo,
        isActive: Boolean(isActive),
        categoryId: Number(categoryId),
        slug: newSlug,
      },
    });

    return res.status(201).json(productCreate);
    
  } catch (error) {
    console.error("ERRO REAL BACKEND:", error);
    return res.status(500).json({ error: "Erro ao criar produto" });
  }
},

  async index(req, res, _next) {
    let query = {};
    // adicionar and(&&) no quantify,ex nome && quantify
    // Adicionar Like em Where: query
    if (req.query.description)
      query.description = { contains: req.query.description };
    if (req.query.name) query.name = { contains: req.query.name };
    if (req.query.quantify)
      query.quantify = Number({ contains: req.query.quantify });
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === "true"; // Aqui está fazendo um pesquisa se o produto está ativo ou não, a última linha serve para impedir que o boolean vire string e transforme ele e boolean
    }

    const products = await prisma.product.findMany({
      where: query,
    });
    res.status(200).json(products);
  },

  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const product = await prisma.product.findUnique({
        where: { id },
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  },

  async delete(req, res, _next) {
    try {
      const id = Number(req.params.id);
      const ProdutoNoPedido = await prisma.orderItem.findFirst({
        where: { productId: id },
      });

      const ExisteNoBanco = await prisma.product.findUnique({
        where: { id },
      });

      if (!ExisteNoBanco) {
        res.status(404).json({ error: "Este produto não existe no banco!" });
      }

      if (ProdutoNoPedido) {
        res.status(400).json({
          error:
            "Você não pode deletar um produto que está sendo vendido para o cliente!",
        });
      }

      const product = await prisma.product.delete({
        where: { id },
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "ERROR ao deletar o Produto" });
    }
  },

  async update(req, res, _next) {
    try {
      let body = {};

      if (req.body.name) body.name = req.body.name;
      if (req.body.description) body.description = req.body.description;
      if (req.body.quantify !== undefined)
        body.quantify = Number(req.body.quantify);
      if (req.body.stock !== undefined) body.stock = Number(req.body.stock);
      if (req.body.maturity) body.maturity = new Date(req.body.maturity);
      if (req.body.tipo) body.tipo = req.body.tipo;
      if (req.body.isActive !== undefined) body.isActive = req.body.isActive;

      const id = Number(req.params.id);

      const product = await prisma.product.update({
        where: { id },
        data: body,
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "ERROR ao atualizar o Produto" });
    }
  },

  async showBySlug(req, res, _next) {
    try {
      const slug = req.params.slug;

      const product = await prisma.product.findFirstOrThrow({
        where: { slug: slug },
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },
};
