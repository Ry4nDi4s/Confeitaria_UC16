import prisma from '../prisma.js';
export const OrderController ={
    async store(req, res, next){
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

    }
}