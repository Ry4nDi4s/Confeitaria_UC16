import prisma from '../prisma.js';
export const IngredienteController ={
    async store(req, res, next){
        try{
            const {description, name, quantify, stock, maturity}= req.body;

            const ingredienteCreate = await prisma.ingrediente.create({
                data: {
                    description,
                    name,
                    quantify,
                    stock, 
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
        
        const ingredientes = await prisma.ingrediente.findMany({
            like: query

        }) 
         res.status(200).json(ingredientes)
        
        }
    }

    

