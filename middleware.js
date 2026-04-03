import jsonwebtoken from 'jsonwebtoken'

export function tratarErro(err,req,res){
    err = new Error("Ops, algo deu errado!")
    console.error(err)
}

export function gerarToken(u){
        return jsonwebtoken.sign({
            id: u.id,
            nome: u.nome
        }, process.env.JWT_TOKEN, {expiresIn: "1h"})
    }

export function authToken(req,res,next){
        const token = req.cookies.authCookie

        if(!token){
            return res.status(403).send("Token inválido!")
        }

        const user = jsonwebtoken.verify(token, process.env.JWT_TOKEN)
        next()
    }
