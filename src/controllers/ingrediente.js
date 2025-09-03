import prisma from '../prisma';
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
                    maturity
                
                }

            });
            res.status(201).json(ingredienteCreateCreate);
        }catch(err){
            next(error);
        }

    }
}
