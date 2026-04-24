import jsonwebtoken from 'jsonwebtoken'
import { __dirname } from './app.js'

export function gerarToken(u){
    const token = jsonwebtoken.sign({
            id: u.id,
            nome: u.nome
        }, process.env.JWT_TOKEN, {expiresIn: "2h"})
        return token
    }

export async function authToken(req,res,next){
    try{
    const token = req.signedCookies[process.env.COOKIE_NAME]

        if(!token){
            return res.sendFile(`${__dirname}/public/main/error.html`)
        }
    
        const user = jsonwebtoken.verify(token, process.env.JWT_TOKEN)
        next()
    }
    catch(error){
        res.clearCookie (process.env.COOKIE_NAME)
        return res.status(401).json({"success":false, "erro": "Não autorizado!"}).sendFile(`${__dirname}/public/main/error.html`)
    }
}

export function validateCookie(req,res,token){
    res.cookie(process.env.COOKIE_NAME,token,{
        httpOnly:true,
        signed:true,
        maxAge:3600000,
        secure:false
    })

}
