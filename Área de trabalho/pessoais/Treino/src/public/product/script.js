function obterIdUrl(){
    const vetores = window.location.pathname.split('/')
    const id = vetores[vetores.length -1]
    return id, vetores
}

async function fetchApi(id){
const fetchApi = await fetch(`/api/pesquisarProdutos/${id}`)
const response = await fetchApi.json()
return response
}

async function carregarProduto(){
const Id = obterIdUrl()
console.log(Id)
const produto = await fetchApi(Id)

document.getElementById("showProduct").innerHTML =  `
    <main class="product-page">
        <section class="image-container">
            <img src="${produto.imagem_url}" alt="${produto.nome}" class="main-img">
        </section>

        <section class="info-container">
            <nav class="breadcrumb">Produtos > ${'Geral'}</nav>
            
            <h1 class="product-title">${produto.nome}</h1>
            
            <div class="price-tag">
                <span class="currency">R$</span>
                <span class="value">${produto.preco.toFixed(2)}</span>
            </div>

            <p class="description">${produto.descricao}</p>

            <div class="purchase-area">
                <div class="stock-info">
                    ${produto.estoque > 0 
                        ? `<span class="in-stock">● Em estoque (${produto.estoque} unidades)</span>` 
                        : `<span class="out-stock">○ Indisponível</span>`}
                </div>
                
                <button class="buy-button" ${produto.estoque === 0 ? 'disabled' : ''}>
                    ADICIONAR AO CARRINHO
                </button>
            </div>
        </section>
    </main>
`}

document.addEventListener("DOMContentLoaded", carregarProduto)