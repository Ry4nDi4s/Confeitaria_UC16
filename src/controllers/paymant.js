import { json } from "express";
import prisma from "../prisma.js";

//c- create, inset, post, set, store
// asincrono nome_da_função (recebendo, responder, proximo)
export const PaymentControler = {
  async store(req, res, _next) {
    try {
      const { paidWithPix, paidWithMoney, value } = req.body;

      if (!paidWithMoney && !paidWithPix) {
        res
          .status(400)
          .json({ error: "Escolha um forma de pagamento valido!" });
      }

      if (!value || value <= 0) {
        res
          .status(400)
          .json({ error: "O valor do pagamento é inválido!" });
      }

      const pay = await prisma.payment.create({
        data: { paidWithPix, paidWithMoney, value },
      });
      //respondendo 201-criado encapsulado
      res.status(201).json(pay);
    } catch (err) {
      _next(err);
    }
  },

  async index(req, res, _next) {
    let query = {};

    if (req.query.value) query = { value: { contains: req.query.value } };

    const payments = await prisma.payment.findMany({
      where: query,
    });
    res.status(200).json(payments);
  },

  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);
      const pay = await prisma.payment.findFirstOrThrow({ where: { id } });
      res.status(200).json(pay);
    } catch (err) {
      res.status(404).json("não encontrato");
    }
  },

  async delete(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const pedidoDelete = await prisma.order.findFirst({
        where: { paymentId: id },
      });

      if (pedidoDelete) {
        return res
          .status(400)
          .json(
            "Você não pode deletar um pagamento que já está vinculado a pedido!",
          );
      }

      const pay = await prisma.payment.delete({ where: { id } });
      res.status(200).json(pay);
    } catch (err) {
      res.status(404).json("não encontrado");
    }
  },

  async put(req, res, next) {
    try {
      const id = Number(req.params.id);
      const pedidoPagamento = await prisma.order.findFirst({
        where: { paymentId: id },
      });

      if (pedidoPagamento.status !== "AGUARDANDO_PAGAMENTO") {
        res.status(400).json("Você não pode editar um pedido já finalizado!");
      }

      if (pedidoPagamento && req.body.value !== undefined) {
        const ValorPedido = Number(pedidoPagamento.subtotal);
        const ValorFinal = Number(req.body, value);

        if (ValorFinal !== ValorPedido) {
          return res.status(400);
        }
      }
      let dados = {};
      if (req.body.paidWithPix) dados.paidWithPix = req.body.paidWithPix;
      if (req.body.paidWithMoney) dados.paidWithMoney = req.body.paidWithMoney;
      if (req.body.value) dados.value = req.body.value;

      let payment = await prisma.payment.update({
        where: { id },
        data: dados,
      });

      res.status(200).json(payment);
    } catch (error) {
      next.status(404).json({ error: "Error" });
    }
  },
};
