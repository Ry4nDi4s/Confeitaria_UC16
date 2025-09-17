import prisma from '../prisma.js';

//c- create, inset, post, set, store
// asincrono nome_da_função (recebendo, responder, proximo)
export const PaymentControler = {
    async store(req, res, _next){
        try{
            const {card, pix, money, value, scheduling} = req.body;
        
            const p = await prisma.payment.create({
                data : {card, pix, money, value, scheduling}
            });
            //respondendo 201-criado encapsulado
            res.status(201).json(p);
        }catch(err){
            _next(err);
        }
    },

    async index(req, res, _next) {

        
        let query = {}
        
        if (req.query.value) query = {value: {contains: req.query.value}}
        if (req.query.scheduling) query = {scheduling: {contains: req.query.scheduling}}
        
        const payments = await prisma.payment.findMany({
            where: query

        }) 
         res.status(200).json(payments)
        
        },

        async show(req, res, _next){
            try{
                const id = Number (req.params.id)
                const u = await prisma.payment.findFirstOrThrow({where:{id}});
                res.status(200).json(u)
            }catch(err){
                res.status(404).json("não encontrato")};
        },

        async delete(req, res, _next){
            try{
            const id = Number (req.params.id)
            const u = await prisma.payment.delete({where:{id}});
            res.status(200).json(u)
        }catch(err){
            res.status(404).json("não encontrato")};
        }
    }

