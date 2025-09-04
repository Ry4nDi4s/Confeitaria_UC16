import prisma from '../prisma.js';

//c- create, inset, post, set, store
// asincrono nome_da_função (recebendo, responder, proximo)

export const ReceitaControler = {
    async store(req, res, next){
        try{
            const {description, name, quantify, stock, maturity} = req.body;
        
            const r = prisma.receita.create({
                    data : {description, name, quantify, stock, maturity}
            });
            res.status(201).json(r);
        }catch(err){
            next(err);
        }
    }
}      