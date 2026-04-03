    import  express from'express'
    import jsonwebtoken from 'jsonwebtoken'
    import 'dotenv/config'
    import { authToken , gerarToken, tratarErro} from './middleware.js'
    import {selectDatabase, insertDatabase, updateDatabase} from './database.js'
    import cookieParser from 'cookie-parser'
    import path, { dirname } from 'path'
    import { fileURLToPath } from 'url'
    

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
       

    const app = express()
    let users = []

    app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.json())
    app.use(cookieParser())

    app.post('/sign-up', async (request, res) => {
        const {nome,email,idade} = request.body

        const newUser = {
            nome,
            email,
            idade
        }

        if (!newUser.email.includes("@")){
            return res.status(400).send("Email inválido!")
        }

        if (!newUser.nome){
            return res.status(400).send("Nome inválido!")
        }

        if (!typeof newUser.idade == "number"){
            return res.status(400).send("Idade precisa ser um número!")
        }

        await insertDatabase(nome,email,idade)
        const token = gerarToken(newUser)

        
        res
        .cookie("authCookie",token,{
            httpOnly:true,
            secure:false,
            maxAge: 1000
        })
        .status(200)
        .json({
            "message": "Usuário criado com sucesso!",
            "token": token
        }

        )

    })

    app.get('/login', async (req, res) =>{
        res.sendFile(`${__dirname}/public/index.html`)

    })

    app.get('/users/:id', authToken, (req,res)=>{
        const Id = req.params.id
        const usersFiltered = users.find(u => u.id == Id)
        res.status(200).send(usersFiltered)
    })


    app.put('/users/:id',async (req,res)=> {
        const Id = parseInt(req.params.id)               
        const {nome} = req.body

        updateDatabase(nome ,Id)
        
        res.status(200).send("Sucesso!")
    })


    app.delete('/users/:id', async (req,res)=>{
        const Id = req.params.id
        let index 
        if(index == -1){
            return res.status(400).send("Id Inválido!")
        }
        users.splice(index)
        res.status(201).send("Deletado com sucesso!")})

app.use(tratarErro)
app.listen(3000, () =>{console.log("Servidor Rodando!")})
