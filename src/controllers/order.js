import prisma from '../prisma.js';
export const OrderController ={
    async store(req, res, next){
        try{
            const {wich_product, who_order, value, quantify, delivery_day, userId, paymentId} =req.body;
        
            const orderCreate = await prisma.ingrediente.create({
                data: {
                    wich_product,
                    who_order,
                    value,
                    quantify,
                    delivery_day,
                    userId,
                    paymentId
                    
                }
            });

            res.status(201).json(orderCreate)
        }catch(err){
            next(err);
        }

    }
}