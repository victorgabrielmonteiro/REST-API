
import cookieParser from "cookie-parser"
import express from 'express'
import path, {dirname} from "path"
import { fileURLToPath } from 'url'
import 'dotenv/config'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const app = express()
const PORT = 3000
export const router = express.Router()


app.use(express.json())
app.use(cookieParser(process.env.COOKIE_NAME))

app.use(express.static(path.join(__dirname, 'public/product')))
app.use(express.static(path.join(__dirname, 'public/main')))
app.use(express.static(path.join(__dirname, 'public/login')))
app.use(express.static(path.join(__dirname, 'public/sign-up')))
app.use('/',router)



app.listen(PORT, () =>{console.log("Servidor Rodando!")})

export default app;