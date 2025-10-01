import prisma from "../prisma.js";

// C - CREATE, INSERT, POST, SET, STORE

// asincrona nome_da_função(recebendo, responder, proximo)
export const ProductController = {
  async store(req, res, next) {
    try {
      const { description, name, quantify,stock, maturity, 
        foto, preco } = req.body;

      const productCreate = await prisma.product.create({
        data: {
          description,
          name,
          quantify,
          stock,
          maturity: new Date(maturity),
          foto,
          preco: Number(preco)
        },
      });

      // respondendo 201-criado encapsulado_no_formato_json(productCreate)
      res.status(201).json(productCreate);
    } catch (error) {
      next(error);
    }
  },
  async index(req, res, next) {
    let query = {};
    // adicionar and(&&) no quantify,ex nome && quantify
    // Adicionar Like em Where: query
    if (req.query.description) query = { description: { contains: req.query.description } };
    if (req.query.name) query = { name: { contains: req.query.name } };
    if (req.query.quantify) query = { quantify: { contains: req.query.quantify } };

    const products = await prisma.product.findMany({
      where: query
    });
    res.status(200).json(products);
  },

  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const product = await prisma.product.findFirstOrThrow({
        where: { id },
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async delete(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const product = await prisma.product.delete({
        where: { id },
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async update(req, res, _next) {
    try {
      let body = {};

      if (req.body.name) body.name = req.body.name;
      if (req.body.description) body.description = req.body.description;
      if (req.body.quantify) body.quantify = req.body.quantify;
      if (req.body.stock) body.stock = req.body.stock;
      if (req.body.maturity) body.maturity = req.body.maturity;

      const id = Number(req.params.id);

      const product = await prisma.product.update({
        where: { id },
        data: body,
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json("Produto não encontrado");
    }
  },
};
