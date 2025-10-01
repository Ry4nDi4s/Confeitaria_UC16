import JsonWebToken from "jsonwebtoken";

export function verificaToken(req, res, next){
    const aunt = req.headers.authorization || "";
    const token = aunt.startsWith("Bearer ") ? aunt.slice(7) : null;

    if(!token){
        return res.status(401).json({erro: "Token não enviado"});
    }

        try{
            const payload = JsonWebToken.verify(token, process.env.JWT_SECRET);
            req.logado = {
                id: payload.sub,
                email: payload.email,
                name: payload.name
            };
            return next();
        }catch(erro){
            return res.status(403).json({erro: "Token Invalido ou expirado"})
    }
}