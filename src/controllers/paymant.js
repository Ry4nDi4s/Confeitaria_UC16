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
    }
}

