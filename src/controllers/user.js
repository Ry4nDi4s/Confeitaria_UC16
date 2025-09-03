import prisma from '../prisma';

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
    }
}