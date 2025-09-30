import prisma from '../prisma.js';
export const OrderController ={
    async store(req, res, next){
        try{
            const {which_product, who_order, value, quantify, delivery_day, userId, paymentId} =req.body;

            let paymentkey = await prisma.payment.findFirst({
                where : {id: Number(paymentId)}
            });

            let userkey = await prisma.user.findFirst({
                where : {id: Number(userId)}
            });
            
            
            if(!paymentkey){ 
                res.status(301).json({
                    'error':"Pedido informado não existe"
                });
                return
            }

            if(!userkey){ 
                res.status(301).json({
                    'error':"Pedido informado não existe"
                });
                return
            }

            let uId = await prisma.cart.findFirst({
                where: {id: Number(req.logado.id)}
              })
        
            let pId = await prisma.cart.findFirst({
                where: {id: Number(req.logado.id)}
            })


        
            const orderCreate = await prisma.order.create({
                data: {
                    which_product,
                    who_order,
                    value,
                    quantify,
                    delivery_day: new Date(delivery_day),
                    userId: Number (uId.req.logado.id),
                    paymentId: Number (pId.req.logado.id)
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

    async show(req, res, _next){
        try{ const id = Number(req.params.id);

            let o = await prisma.order.findFirstOrThrow({where:{id}});

            res.status (200).json(o);
        }catch(err){
            res.status(400).json("Não encontrado")
        
        }
    },

    async  del(req, res, _next){
        try {
            const id = Number (req.params.id);
            const o = await prisma.order.delete({where: {id}});

            res.status(200).json(o);
        }catch (err) {
            res.status (404).json({err: "Pedido não encontrado"});
        }


    },

    async  put(req, res, _next){
        try {

            let body = {}
            const id = Number (req.params,id); 
            const o = await prisma.order.put({
                where:{id},
                
            });

            res.status(200).json (o);
        }catch (err) {
            res.status(400).json({err:"Não encontrado"})
        }

    }

}

