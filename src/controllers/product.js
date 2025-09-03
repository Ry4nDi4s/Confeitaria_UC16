import prisma from `../prisma`;

// C - CREATE, INSERT, POST, SET, STORE

// asincrona nome_da_função(recebendo, responder, proximo)
export const  ProductController = {
    async store(req, res, next){
        try{
        
        const {description, name, quantify, stock, maturity} = req.body;
    
        const productCreate = await prisma.product.create({
            data: { description, name, quantify, stock, maturity}
        }
        );

        // respondendo 201-criado encapsulado_no_formato_json(ProductController)
        res.status(201).jsaon(ProductController);
        }catch(error){
            next(error);
        }
    }
}
