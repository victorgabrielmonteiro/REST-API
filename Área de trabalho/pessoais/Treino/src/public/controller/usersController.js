export async function validadorSenha(senha){
    
    if(senha.length < 8){
        const erro = {"message":"A senha deve conter ao menos 8 caracteres"}
        return erro
    }
    if(senha.includes(" ")){
        const erro = {"message":"A senha não pode conter espaços"}
        return erro
    }
}

export function validadorEmail(email){
    if(!email.includes("@")){
        const erro = {"message":"O email deve conter um domínio!"}
        return erro
    }
}
