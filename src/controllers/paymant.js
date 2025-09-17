import prisma from '../prisma.js';

//c- create, inset, post, set, store
// asincrono nome_da_função (recebendo, responder, proximo)
export const PaymentControler = {
    async store(req, res, next){
        try{
            const {card, pix, money, value, scheduling} = req.body;
        
            const p =  await prisma.payment.create({
                data : {card, pix, money, value, scheduling}
            });
            //respondendo 201-criado encapsulado
            res.status(201).json(p);
        }catch(err){
            next(err);
        }
    },
    async index(req, res, next) {

        
        let query = {}
        
        if (req.query.value) query = {value: {contains: req.query.value}}
        if (req.query.scheduling) query = {scheduling: {contains: req.query.scheduling}}
        
        const payments = await prisma.payment.findMany({
            where: query

        }) 
         res.status(200).json(payments)
        
        }
    }

