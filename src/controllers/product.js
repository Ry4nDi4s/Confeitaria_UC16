import prisma from '../prisma.js';

// C - CREATE, INSERT, POST, SET, STORE

// asincrona nome_da_função(recebendo, responder, proximo)
export const  ProductController = {
    async store(req, res, next){
        try{
        
        const {description, name, quantify, stock, maturity} = req.body;
    
        const productCreate = await prisma.product.create({
            data: { description, name, quantify, stock, maturity : new Date(product)}
        }
        );

        // respondendo 201-criado encapsulado_no_formato_json(ProductController)
        res.status(201).jsaon(ProductController);
        }catch(error){
            next(error);
        }
    },
    async index(req, res, next) {
        const products = await prisma.product.findMany()

        res.status(200).json(products)
    }
}
