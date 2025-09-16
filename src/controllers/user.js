import prisma from '../prisma.js';

// Asincrono nome_da_função(recebendo, responder, próximo)
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

        if (req.query.name) query = {name: req.query.name}
        

        const users = await prisma.user.findMany({
            where: query            
        })
        res.status(200).json(users)
    }
}