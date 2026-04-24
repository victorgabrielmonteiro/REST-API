import 'dotenv/config'
import { authToken , gerarToken, validateCookie} from './middleware.js'
import {loginDatabase, insertDatabase, updateDatabase, selectProducts, selectDatabase, selectProductById} from './database.js'
import app from './app.js'    
import { __filename, __dirname } from './app.js'
import { router } from './app.js'

    router.get('/home', (req,res)=>
        res.sendFile(`${__dirname}/public/main/home.html`))

    router.get('/produtos/:id',(req,res)=> 
        res.sendFile(`${__dirname}/public/product/product.html`))

    router.get('/produtos',(req,res)=> 
        res.sendFile(`${__dirname}/public/main/main.html`))

    router.get('/sign-up',(req,res)=>
        res.sendFile(`${__dirname}/public/sign-up/signup.html`))

    router.get('/login', async (req, res) =>{
        res.sendFile(`${__dirname}/public/login/login.html`)
    })    
      
    router.get('/api/pesquisarProdutos/:id',async (req,res)=>{
    const Id = req.params.id
    const query = await selectProductById(Id)
    console.log(query[0])
    res.json(
        query[0]
    )})
    
    router.get('/listarprodutos',async (req,response)=>{
        const rows = await selectProducts()
        response.json({"message": rows})
    })
    

    router.post('/sign-up', async (req, res) => {
        const {nome,email,idade,senha} = req.body

        const newUser = {
            nome,
            email,
            idade,
            senha
        }

        await insertDatabase(nome,email,idade,senha)
        const token = gerarToken(newUser)
        validateCookie(req,res,token)
        res.json({"message":"Usuário criado com sucesso!"})
    })

    router.post('/login', async (req,res)=>{
    
        const email = req.body.email
        const senha = req.body.senha

        const user = {
            email,
            senha
        }

        const response = await loginDatabase(user.email)

        if(response.length >= 1){
            if(senha != response[0].senha)
                res.json({"message": "Senha Inválida!", "success": "false"})
            else{
                const userDb = response[0]
                const token = gerarToken({id:userDb.id, nome: userDb.nome})
                validateCookie(req,res,token)
                res.status(200).json({"success":true})
            }
        }
        else{
            return res.status(401).json({"success":"false"});}
    })

    router.put('/users/:id',async (req,res)=> {
        const Id = parseInt(req.params.id)               
        const {nome} = req.body

        updateDatabase(nome ,Id)
    
        res.status(200).send("Sucesso!")
    })

    router.delete('/users/:id', async (req,res)=>{
        const Id = req.params.id
        let index 
        if(index == -1){
            return res.status(400).send("Id Inválido!")
}
        users.splice(index)
        res.status(201).send("Deletado com sucesso!")})
