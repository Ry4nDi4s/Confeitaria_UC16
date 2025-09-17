import prisma from '../prisma.js';

//c- create, inset, post, set, store
// asincrono nome_da_função (recebendo, responder, proximo)

export const ReceitaControler = {
    async store(req, res, next){
        try{
            const {description, name, quantify, stock, maturity} = req.body;
        
            const r = prisma.receita.create({
                    data : {description, name, quantify, stock, maturity: new Date(maturity)}
            });
            res.status(201).json(r);
        }catch(err){
            next(err);
        }
    }, 
    async index(req, res, next) {
        
        let query = {}

        if (req.query.description) query = {description: req.query.description}
        if (req.query.name) query = {name: req.query.name}
        if (req.query.quantify) query = {quantify: req.query.quantify}
        
        const receitas = await prisma.receita.findMany({
            like: query

        }) 
         res.status(200).json(receitas)
        
        }
    }