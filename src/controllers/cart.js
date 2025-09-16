import prisma from '../prisma.js';

export const CartController = {
    async store(req, res, next){
        try{

            const { quantity, orderId, produtoId } = req.body;
        
            const cartCreate = await prisma.cart.create({
                data: {quantity, orderId: Number (orderId), produtoId: Number (produtoId)}
            }
            );

            res.status(201).jsaon(cartCreate);
        }catch(error){
            next(error);
        }
    },
    async index(req, res, next) {
        const carts = await prisma.cart.findMany()

        res.status(200).json(carts)
    }
}