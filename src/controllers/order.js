import prisma from "../prisma.js";
import { OrderStatus } from "@prisma/client";

export const OrderController = {
async store(req, res, next) {
  try {
    const {
      Delivery,
      DeliveryDay,
      ReadyAt,
      items,
      status,
      userId,
      paymentId,
    } = req.body;

    if (!userId || !paymentId) {
      return res.status(400).json({ error: "userId e paymentId são obrigatórios" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "items é obrigatório" });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: Number(paymentId) },
    });
    if (!payment) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }

    // calcula subtotal
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.quantity * item.unitPrice;
    }

    // cria pedido
    const order = await prisma.order.create({
      data: {
        Delivery,
        DeliveryDay: DeliveryDay ? new Date(DeliveryDay) : null,
        ReadyAt: ReadyAt ? new Date(ReadyAt) : null,
        subtotal,
        status: status || OrderStatus.AGUARDANDO_PAGAMENTO,
        userId,
        paymentId,
      },
    });

    // cria itens do pedido
    for (const item of items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        },
      });
    }

    return res.status(201).json(order);
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

      include: {
        items: true,
        user: true,
        payment: true,
      },
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
    const order = await prisma.order.findFirst({
      where: { id, userId: req.logado.id },
    });

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    await prisma.order.delete({
      where: { id },
    });

      res.status(200).json(order);
    } catch (err) {
      res.status(404).json({ err: "Pedido não encontrado" });
    }
  },

  async put(req, res, _next) {
    try {
      let body = {};
      const id = Number(req.params.id);
      const o = await prisma.order.update({
        where: {
          id: id,
          userId: req.logado.id,
        },
        data: body,
      });

      res.status(200).json(o);
    } catch (err) {
      res.status(400).json({ err: "Pedido não encontrado" });
    }
  },
};
