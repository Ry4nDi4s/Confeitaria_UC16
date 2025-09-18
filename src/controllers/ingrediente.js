import prisma from '../prisma.js';
export const IngredienteController ={
    async store(req, res, next){
        try{
            const {description, name, quantify, stock, maturity}= req.body;

            const ingredienteCreate = await prisma.ingrediente.create({
                data: {
                    description,
                    name,
                    quantify: Number(quantify),
                    stock: Number(stock), 
                    maturity:new Date(maturity)
                
                }

            });
            res.status(201).json(ingredienteCreate);
        }catch(err){
            next(err);
        }
    },
    async index(req, res, next) {

        let query = {}

        
        if (req.query.name) query = {name: req.query.name}
        if (req.query.quantify) query = {quantify: req.query.quantify}
        if (req.query.description) query = {description: req.query.description}
        
        const ingredientes = await prisma.ingrediente.findMany({
            where: query

        }) 
         res.status(200).json(ingredientes)
         

         
        
    },
    async show(req, res, _next){
        try{ 
            const id = Number(req.params.id);

            let i = await prisma.ingrediente.findFirstOrThrow({where:{id}});

            res.status(200).json(i);
        }catch(err){
            res.status(400).json("Não encontrado")
        }
    },

    async  del(req, res, _next){
        try {
            const id = Number (req.params.id);
            const i = await prisma.ingrediente.delete({where: {id}});

            res.status(200).json(i);
        }catch (err) {
            res.status (404).json({err: "ingrediente não encontrado"});
        }


    }
}

    

