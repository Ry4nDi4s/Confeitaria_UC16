import prisma from '../prisma.js';

// C - CREATE, INSERT, POST, SET, STORE

// asincrona nome_da_função(recebendo, responder, proximo)
export const  ProductController = {
    async store(req, res, next){
        try{
        
        const {description, name, quantify, stock, maturity} = req.body;
    
        const productCreate = await prisma.product.create({
            data: { description, name, quantify, stock, maturity : new Date(maturity)}
        }
        );

        // respondendo 201-criado encapsulado_no_formato_json(productCreate)
        res.status(201).json(productCreate);
        }catch(error){
            next(error);
        }
    },
    async index(req, res, next) {

        let query = {}
        
        // adicionar and(&&) no quantify,ex nome && quantify
        // Adicionar Like em Where: query
        if (req.query.name) query = {name: req.query.name}
        if (req.query.quantify) query = {quantify: req.query.quantify}
        
        const products = await prisma.product.findMany({
            like: query

        }) 
         res.status(200).json(products)
        
        }
    }

