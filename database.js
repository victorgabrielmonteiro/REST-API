import { createPool } from 'mysql2'
import 'dotenv/config'

const pool = createPool({
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
    
}).promise()

export async function selectDatabase(){
    const [rows] = await pool.query("SELECT * from usuarios")
    return console.log(rows);
}

export async function loginDatabase(email){
    const [rows] = await pool.query("SELECT senha from usuarios where email = ?", [email])
    console.log(rows)
    return rows
}



export function insertDatabase(a,b,c,d){
    const insert = pool.execute("INSERT INTO usuarios(nome, email, idade, senha) VALUES (?, ?, ?, ?);",[a,b,c,d])
}

export function updateDatabase(a, b){
    pool.execute("UPDATE usuarios SET nome = ? WHERE id = ?", [a, b])

}