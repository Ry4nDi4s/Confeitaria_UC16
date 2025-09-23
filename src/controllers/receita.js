import prisma from '../prisma.js';

//c- create, inset, post, set, store
// asincrono nome_da_função (recebendo, responder, proximo)

export const ReceitaControler = {
    async store(req, res, _next){
        try{
            const {description, name, quantify, stock, maturity} = req.body;

            //new
            let i = await prisma.ingredient.findfirts({
                where:{id:Number( ingredientId)}
            });
            //new
            if(!i){
                res.status(301).json({'error':"igretiente não intendificado"});
                return
            }

            //new
            let p = await prisma.produto.findfirts({
                where:{id:Number(produtoId)}
            });
            //new
            if(!p){
                res.status(301).json({'error':"produto não intendificado"});
                return
            }
        
            const r = prisma.receita.create({
                    data : {description, name, quantify, stock, maturity: new Date(maturity)}
            });
            res.status(201).json(r);
        }catch(err){
            _next(err);
        }
    }, 
    async index(req, res, _next) {
        
        let query = {}

        if (req.query.description) query = {description: {contains: req.query.description}}
        if (req.query.name) query = {name: {contains: req.query.name}}
        if (req.query.quantify) query = {quantify: {contains: req.query.quantify}}
        
        const receitas = await prisma.receita.findMany({
            where: query

        }) 
         res.status(200).json(receitas)
        
        },
        async show(req, res, _next){
            try{
                const id = Number (req.params.id)
                const r = await prisma.receita.findFirstOrThrow({where:{id}});
                res.status(200).json(r)
            }catch(err){
                res.status(404).json("não encontrato")}; 
    },
    async delete(req, res, _next){
        try{
        const id = Number (req.params.id)
        const r = await prisma.receita.delete({where:{id}});
        res.status(200).json(r)
    }catch(err){
        res.status(404).json("não encontrato")};
    }, 

    async put(req, res, next){
        try{
            const id = Number(req.params.id)
            let dados={}
                if (req.body.description) dados.description = (req.body.description)
                if (req.body.name) dados.name= (req.body.name)
                if (req.body.quantify) dados.quantify = (req.body.quantify)
                if (req.body.stock) dados.stock = (req.body.stock)
                if (req.body.maturity) dados.maturity = (req.body.maturity)

            let receita = await prisma.receita.update({
                where:{id},
                data: body
            })

            res.status(200).json(receita)
        }catch(error){
            next.status(404).json({error: "Error"})
        }
    }

}