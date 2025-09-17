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

    },
    async index(req, res, next){

        let query = {}

        if (req.query.value) query = {value: req.query.value}
        if (req.query.quantify) query = {quantify: req.query.quantify}
        if (req.query.delivery_day) query = {delivery_day: req.query.delivery_day}
        if (req.query.which_product) query = {which_product: req.query.which_product}


        const orders = await prisma.order.findMany({
        where: query

        }) 
         res.status(200).json(orders)
        
    },
    async Show(req, res, next){
        try{ const id = Number(req.params.id);

            let o = await prisma.order.findFirstOrThrow(id);

            res.status (200).json(o);
        }catch{err}{
            res.status(400).json("Não encontrado")
        }
    }
}