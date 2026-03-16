import prisma from "../prisma.js";
import { OrderStatus } from "@prisma/client";

export const OrderController = {
  async store(req, res, next) {
    try {
      const {
        Delivery,
        subtotal,
        DeliveryDay,
        ReadyAt,
        items,
        status,
        userId,
        paymentId,
      } = req.body;

      let data = {
        Delivery,
        subtotal,
        DeliveryDay: new Date(DeliveryDay),
        ReadyAt: new Date(ReadyAt),
        status: status || OrderStatus.AGUARDANDO_PAGAMENTO,
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

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            error: "items é obrigatório e deve ser um array não vazio.",
          });
      }

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (!it?.productId || !it?.quantity || !it?.unitPrice) {
          return res.status(400).json({
            error: `Item #${i + 1} inválido: precisa de productId, quantity e unitPrice.`,
          });
        }
        if (Number(it.quantity) <= 0) {
          return res.status(400).json({ error: `Item #${i + 1}: quantity deve ser > 0.` });
        }
      }

      const orderCreate = await prisma.order.create({
        data: data,
      });

      const OrderItem = items.map((validaItem) => ({
        orderId: orderCreate.id,
        productId: validaItem.productId,
        quantity: validaItem.quantity,
        unitPrice: validaItem.unitPrice,
      }));

      const ItensCreate = OrderItem.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));

      const Itens_Order = [ ...OrderItem, ...ItensCreate]; // Combina os dois arrays e os "..." serve para espalhar os itens do ItensCreate dentro do array Itens_Order

      await prisma.orderItem.createMany({
        data: Itens_Order
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
