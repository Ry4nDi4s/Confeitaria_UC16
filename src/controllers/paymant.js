import prisma from '../prisma.js';

//c- create, inset, post, set, store
// asincrono nome_da_função (recebendo, responder, proximo)
export const PaymentControler = {
    async store(req, res, _next){
        try{
            const {card, pix, money, value, scheduling} = req.body;

            if (!validaCartao(card)) {
                return res.status(400).json({error: "Cartão inválido"});
            }

    
            const pay = await prisma.payment.create({
                data : {card, pix, money, value, scheduling}
            });
            //respondendo 201-criado encapsulado
            res.status(201).json(pay);
        }catch(err){
            _next(err);
        }
    },

    async index(req, res, _next) {

        
        let query = {}
        
        if (req.query.value) query = {value: {contains: req.query.value}}
        if (req.query.scheduling) query = {scheduling: {contains: req.query.scheduling}}

        //where.userid=Reg.logado.id
        
        const payments = await prisma.payment.findMany({
            where: query

        }) 
         res.status(200).json(payments)
        
        },

        async show(req, res, _next){
            try{
                const id = Number (req.params.id)
                const pay = await prisma.payment.findFirstOrThrow({where:{id}});
                res.status(200).json(pay)
            }catch(err){
                res.status(404).json("não encontrato")};
        },

        async delete(req, res, _next){
            try{
            const id = Number (req.params.id)
            const pay = await prisma.payment.delete({where:{id}});
            res.status(200).json(pay)
        }catch(err){
            res.status(404).json("não encontrado")};
        },

        async put(req, res, next){
            try{
                const id = Number(req.params.id)
                let dados={}
                if (req.body.pix) dados.pix = (req.body.pix)
                if (req.body.money) dados.money = (req.body.money)
                if (req.body.card) dados.card = (req.body.card)
    
                let payment = await prisma.payment.update({
                    where:{id},
                    data: body
                })
    
                res.status(200).json(payment)
            }catch(error){
                next.status(404).json({error: "Error"})
            }
        }

    }

    function validaCartao(numero) {
        if (!numero) return false;
        console.log(numero)
      
        const digits = numero.replace(/\D/g, '');
        if (digits.length < 13 || digits.length > 19) return false;
      
        let soma = 0;
        let alterna = false;
      
        for (let i = digits.length - 1; i >= 0; i--) {
          let n = parseInt(digits[i], 10);
          if (alterna) {
            n *= 2;
            if (n > 9) n -= 9;
          }
          soma += n;
          alterna = !alterna;
        }
        return (soma % 10 === 0);
    }

