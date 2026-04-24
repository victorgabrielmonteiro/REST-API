const signupButton = document.getElementById("buttonSignUp")

signupButton.addEventListener('click',async ()=>{
    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const idade = document.getElementById("idade").value
    const senha = document.getElementById("senha").value

    const user = {nome,email,idade,senha}
    const fetchApi = await fetch('/sign-up', {
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })

    const response = await fetchApi.json()
    if (response.message == "Usuário criado com sucesso!"){
        document.getElementById("returnSignup").innerHTML = "Account created successfully!"
        console.log(response.message)
        window.location.href = "/login"   
    }
    else{
        document.getElementById("returnSignup").innerHTML = "Issue creating account"
    }
})

