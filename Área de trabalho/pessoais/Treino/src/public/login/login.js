const loginButton = document.getElementById("loginButton")
if(loginButton){
loginButton.addEventListener('click', async () => {
    const email = document.getElementById("email").value
    const senha = document.getElementById("password").value

    const userData = { "email": email, "senha": senha }

    const fetchApi = await fetch("/login",
        {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(userData)
        }
    )
    const res = await fetchApi.json()

    if (res.success == true) {
        document.getElementById("returnLogin").innerHTML = "Login Success!"
        window.location.href="/produtos"
    }
    else {
        document.getElementById("returnLogin").innerHTML = "Login Failed!"
    }
})}

