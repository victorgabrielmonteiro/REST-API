async function Api() {
    const fetchApi = await fetch('/listarprodutos');
    const dados = await fetchApi.json();
    return Object.values(dados);
}

addEventListener('DOMContentLoaded', async () => {
    const produtos = await Api();
    const container = document.querySelector("#insertProdutos");

    produtos[0].forEach(p => {
        container.innerHTML += `
        <div class="card">
            <div class="image-box">
                <img src="${p.imagem_url}" alt="${p.nome}">
            </div>
            <div class="card-content">
                <h3>${p.nome}</h3>
                <p class="stock">Estoque: <strong>${p.estoque}</strong></p>
                <div class="price-row">
                    <span class="price">R$ ${p.preco}</span>
                    <button onclick="redirecionar(${p.id})"class="buy-btn">COMPRAR</button>
                </div>
            </div>
        </div>`;
    });
});

function redirecionar(id){
    window.location.href= `/produtos/${id}`
}