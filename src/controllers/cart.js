import prisma from '../prisma.js';

export const CartController = {
    async store(req, res, next){
        try{

            const { quantity, orderId, produtoId } = req.body;
        
            const cartCreate = await prisma.cart.create({
                data: {quantity, orderId: Number (orderId), produtoId: Number (produtoId)}
            }
            );

            res.status(201).json(cartCreate);
        }catch(error){
            next(error);
        }
    },
    async index(req, res, next) {

        let query = {}

        if (req.query.quantify) query = {quantify: req.query.quantify}
        
        const carts = await prisma.cart.findMany({
            where: query

        }) 
         res.status(200).json(carts)
        
        }
    }