import { loginDatabase } from "../database";

const loginButton = document.getElementById("loginButton")


loginButton.addEventListener('click',async ()=>{
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log("teste");

    await fetch("/login", { email, password }).then((response) => {return response.json});

    const passwordDatabase = await loginDatabase(email)
    if(password === passwordDatabase){
        document.getElementById("returnLogin").innerHTML = "Login Success!"
    }

    else{
        document.getElementById("returnLogin").innerHTML = "Login Failed!"
    }
})