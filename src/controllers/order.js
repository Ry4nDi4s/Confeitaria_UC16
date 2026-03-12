import prisma from "../prisma.js";
export const OrderController = {
  async store(req, res, next) {
    try {
      const {
        Delivery,
        subtotal,
        DeliveryDay,
        ReadyAt,
        userId,
        paymentId,
        items,
        status,
      } = req.body;

      let data = {
        Delivery,
        subtotal,
        DeliveryDay: new Date(DeliveryDay),
        ReadyAt: new Date(ReadyAt),
        items,
        status,
      };
      
      if (paymentId) {
        let paymentkey = await prisma.payment.findFirst({
          where: { id: Number(paymentId) },
        });
        if (!paymentkey) {
          res.status(301).json({
            error: "Pagamento não encontrado",
          });
          return;
        }
        data.paymentId = Number(paymentId);
      }

      if (userId) {
        let userkey = await prisma.user.findFirst({
          where: { id: Number(userId) },
        });
        if (!userkey) {
          res.status(301).json({
            error: "Usuário não existe",
          });
          return;
        }
        data.userId = Number(userId);
      }

      const orderCreate = await prisma.order.create({
        data: data,
      });

      res.status(201).json(orderCreate);
    } catch (err) {
      next(err);
    }
  },
  async index(req, res, _next) {
    let query = {};

    if (req.query.Delivery) query = { Delivery: req.query.Delivery };
    if (req.query.subtotal) query = { subtotal: req.query.subtotal };
    if (req.query.DeliveryDay) query = { DeliveryDay: req.query.DeliveryDay };
    if (req.query.ReadyAt) query = { ReadyAt: req.query.ReadyAt };

    const orders = await prisma.order.findMany({
      where: query,
    });
    res.status(200).json(orders);
  },

  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);

      let o = await prisma.order.findFirstOrThrow({
        where: {
          id: id,
          userId: req.logado.id,
        },
      });

      res.status(200).json(o);
    } catch (err) {
      res.status(400).json("Não encontrado");
    }
  },

  async del(req, res, _next) {
    try {
      const id = Number(req.params.id);
      const o = await prisma.order.delete({
        where: {
          id: id,
          userId: req.logado.id,
        },
      });

      res.status(200).json(o);
    } catch (err) {
      res.status(404).json({ err: "Pedido não encontrado" });
    }
  },

  async put(req, res, _next) {
    try {
      let body = {};
      const id = Number(req.params, id);
      const o = await prisma.order.put({
        where: {
          id: id,
          userId: req.logado.id,
        },
      });

      res.status(200).json(o);
    } catch (err) {
      res.status(400).json({ err: "Pedido não encontrado" });
    }
  },
};
