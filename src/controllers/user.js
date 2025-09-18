import { json } from 'express';
import prisma from '../prisma.js';

// Asincrono nome_da_função(req = eu estou mandando para o servidor uma informação, res = o servidor respondendo meu pedido, next = caso haja erro passe para o próximo)
// Asincrono = espera algum valor, por exemplo a function não
export const UserControler = {
    async store(req, res, next){
    try{
        const {name, email, password, phone, CPF} = req.body
    
        const userCreated = await prisma.user.create({
            data: {
                name, email, password, phone, CPF
            }
        });

    // respondendo 201 - criando encapsulando no formato json(com a variavel userCreated)
    res.status(201).json(userCreated);
    }catch(error){
        next(error);
        }
    },

    async index(req, res, next){

        let query = {}

        if (req.query.name) query = {name: req.query.name}
        if (req.query.email) query = {email: req.query.email}
        if (req.query.password) query = {password: req.query.password}
        if (req.query.phone) query = {phone: req.query.phone}
        if (req.query.CPF) query = {CPF: req.query.CPF}
        
        const users = await prisma.user.findMany({
            where: query            
        })
        res.status(200).json(users)
    },

    async show(req, res, next){
        try{
            const id = Number(req.params.id)
    
            const user = await prisma.user.findFirstOrThrow({
                where: {id}
            })
    
            res.status(200).json(user)
        }catch(error){
            res.status(404).json({error: "Usuário não encontrado"})
        }
    },

    async delete(req, res, next){
        try{
            const id = Number(req.params.id)
    
            const user = await prisma.user.delete({where:{id}})
    
            res.status(200).json(user)
        }catch(error){
            next.status(404).json({error: "Usuário não encontrado"})
        }
    },
    
    async put(req, res, next){
        try{
            const id = Number(req.params.id)
            let dados={}

            if (req.body.name) dados.name = (req.body.name)
            if (req.body.email) dados.email = (req.body.email) 
            if (req.body.phone) dados.phone = (req.body.phone) 

            let user = await prisma.user.update({
                where:{id},
                data: body
            })

            res.status(200).json(user)
        }catch(error){
            next.status(404).json({error: "Error"})
        }
    }
}