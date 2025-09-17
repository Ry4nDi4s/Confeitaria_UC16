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

        if (req.query.description) query = {description: {contains: req.query.description}}
        if (req.query.name) query = {name: {contains: req.query.name}}
        if (req.query.quantify) query = {quantify: {contains: req.query.quantify}}
        
        const receitas = await prisma.receita.findMany({
            where: query

        }) 
         res.status(200).json(receitas)
        
        },
        async show(req, res, next){
            try{
                const id = Number (req.params.id)
                const u = await prisma.receita.findFirstOrThrow({where:{id}});
                res.status(200).json(u)
            }catch(err){
                res.status(404).json("não encontrato")
            } 
    }
}