import prisma from "../prisma.js";

export const CartController = {
  async store(req, res, next) {
    try {
      const { quantify, orderId, produtoId } = req.body;

      const cartCreate = await prisma.cart.create({
        data: {
          quantify,
          orderId: Number(orderId),
          produtoId: Number(produtoId),
        },
      });

      res.status(201).json(cartCreate);
    }catch(error) {
      next(error);
    }
  },

  async index(req, res, next) {
    let query = {};

    if (req.query.quantify) query = { quantify: req.query.quantify };

    const carts = await prisma.cart.findMany({
      where: query,
    });
    res.status(200).json(carts);
  },

  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const cart = await prisma.product.findFirstOrThrow({
        where: id,
      });

      res.status(200).json(cart);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async del(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const cart = await prisma.cart.delete({
        where: { id },
      });

      res.status(200).json(cart);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async update(req, res, _next) {
    try {
        let body = {};
        const id = Number(req.params.id);

         if (req.body.quantity) body.quantity = (req.body.quantity);

      let cart = await prisma.cart.update({
        where: { id },
        data: body
      });

      res.status(200).json(cart);
    } catch(err){
      res.status(404).json("Carrinho não encontrado");
    }
  },
};
