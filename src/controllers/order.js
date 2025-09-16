import prisma from '../prisma.js';
export const OrderController ={
    async store(req, res, next){
        console.log(req.body)
        try{
            const {which_product, who_order, value, quantity, delivery_day, userId, paymentId} =req.body;
        
            const orderCreate = await prisma.order.create({
                data: {
                    which_product,
                    who_order,
                    value,
                    quantity,
                    delivery_day: new Date(delivery_day),
                    userId: Number (userId),
                    paymentId: Number (paymentId)
                }
            });

            res.status(201).json(orderCreate)
        }catch(err){
            next(err);
        }

    },
    async index(req,res,next){
        const order =await prisma.order.findMany()
        res.status(200).json(order)
    }
}