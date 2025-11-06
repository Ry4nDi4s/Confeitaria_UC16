import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

// Asincrono nome_da_função(req = eu estou mandando para o servidor uma informação, res = o servidor respondendo meu pedido, next = caso haja erro passe para o próximo)
// Asincrono = espera algum valor, por exemplo a function não
export const UserControler = {
    async store(req, res, next) {
        try {
            const { name, email, password, phone, CPF} = req.body

            if (!validarEmail(email)) {
                return res.status(400).json({ error: "Email inválido" });
            }

            if (!validarSenha(password)) {
                return res.status(400).json({ error: "Senha fraca. Use pelo menos 8 caracteres, incluindo letras e números." });
            }

            if (!validarTelefone(phone)) {
                return res.status(400).json({ error: "Telefone inválido. Use o formato (XX)XXXXX-XXXX" });
            }

            if (CPF && !validarCPF(CPF)) {
                return res.status(400).json({ error: "CPF inválido" });
            }

            const hash = await bcrypt.hash(password, 10)

            const userCreated = await prisma.user.create({
                data: {
                    name, email, password: hash, phone, CPF
                }
            });

            // respondendo 201 - criando encapsulando no formato json(com a variavel userCreated)
            res.status(201).json(userCreated);
        } catch (error) {
            next(error);
        }
    },

    async index(req, res, _next) {

        let query = {}

        if (req.query.name) query = { name: req.query.name }
        if (req.query.email) query = { email: req.query.email }
        if (req.query.password) query = { password: req.query.password }
        if (req.query.phone) query = { phone: req.query.phone }
        if (req.query.CPF) query = { CPF: req.query.CPF }

        const users = await prisma.user.findMany({
            where: query
        })
        res.status(200).json(users)
    },

    async show(req, res, _next) {
        try {
            const id = Number(req.params.id)

            const user = await prisma.user.findFirstOrThrow({
                where: { id }
            })

            res.status(200).json(user)
        } catch (error) {
            res.status(404).json({ error: "Usuário não encontrado" })
        }
    },

    async delete(req, res, _next) {
        try {
            const id = Number(req.params.id)

            const user = await prisma.user.delete({ where: { id } })

            res.status(200).json(user)
        } catch (error) {
            res.status(404).json({ error: "Usuário não encontrado" })
        }
    },

    async put(req, res, _next) {
        try {
            const id = Number(req.params.id)
            let dados = {}
            if (req.body.name) dados.name = (req.body.name)
            if (req.body.email) dados.email = (req.body.email)
            if (req.body.phone) dados.phone = (req.body.phone)

            let user = await prisma.user.update({
                where: { id },
                data: body
            })

            res.status(200).json(user)
        } catch (error) {
            res.status(404).json({ error: "Usuário não encontrado" })

        }
    },

    async aunt(req, res, next) {
        try {
            const { email, senha } = req.body

            let u = await prisma.user.findFirst({
                where: { email: email }
            })

            if (!u) {
                res.status(404).json({ erro: "Erro no Email" })
                return;
            }

            const ok = await bcrypt.compare(senha, u.password)
            if (!ok) {
                return res.status(401).json({ erro: "Erro na senha" })
            }

            // Gerar JWT(payload minimo)
            const token = jwt.sign(
                { sub: u.id, email: u.email, name: u.name },
                process.env.JWT_SECRET,
                { expiresIn: "8h" }
            );
            return res.status(200).json({ token });
        } catch (erro) {
            next(erro)
        }
    },

    async auntAdmin(req, res, next) {
        try {
            const { email, senha} = req.body

            let u = await prisma.user.findFirst({
                where: { email: email }
            })

            if (!u) {
                res.status(404).json({ erro: "Erro no Email" })
                return;
            }

            const ok = await bcrypt.compare(senha, u.password)
            if (!ok) {
                return res.status(401).json({ erro: "Erro na senha" })
            }

            if (u.groups !== "ADMIN"){
                res.status(403).json({ erro: "Você não tem permissão para acessar"})
            }

            // Gerar JWT(payload minimo)
            const token = jwt.sign(
                { sub: u.id, email: u.email, name: u.name },
                process.env.JWT_SECRET,
                { expiresIn: "8h" }
            );
            return res.status(200).json({ token });
        } catch (erro) {
            next(erro)
        }
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) return false;

    // Elimina CPFs inválidos conhecidos (ex: 00000000000, 11111111111, etc.)
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Valida primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito > 9) primeiroDigito = 0;
    if (parseInt(cpf.charAt(9)) !== primeiroDigito) return false;

    // Valida segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito > 9) segundoDigito = 0;
    if (parseInt(cpf.charAt(10)) !== segundoDigito) return false;

    return true; // CPF válido
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarSenha(senha) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
}

function validarTelefone(telefone) {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
}
