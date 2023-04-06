// Pegando as variaveis
const apiKey = "4126197f";
const formSearch = document.querySelector("form");

// Adicionando um evento que dispara quando o usuário envia o form.
formSearch.addEventListener("submit", (e) => {
    
    // Evitando a configuração padrão de envio do EventListener.
    e.preventDefault();
    
    // Variavel que pega o valor enviado pelo usuário.
    const search = e.target.search.value;
    
    // Se o valor estiver vazio, enviamos um alerta ao usuário, e damos um return vazio para finalizar a execução.
    if(search == ""){

        alert("Preencha o campo!");
        return;

    }
    
    // Armazendo o link da API o(s) de acordo com a procura do usuário e da apiKey.
    const apiUrl = `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`;
    
    // Requisitando na API o(s) filme(s) de acordo com a pesquisa do usuário
    fetch(apiUrl).then( (response) => {
        
        // Retornando o resultado da API, já em JSON.
        return response.json()

    })
    .then( (data) => {
        
        // Chamando a função e passando o resultado da API já em json.
        carregaLista(data);

    })
    
    // Função que carrega no front o resultado
    const carregaLista = ( data ) => {

        const list = document.querySelector("div.list");
        list.innerHTML = "";
        
        // Se não for encontrado nenhum filme, soltamos um alerta ao usuário, e damos um return vazio para finalizar a execução.
        if(data.Response === "False"){
            alert("Nenhum filme encontrado");
            return;
        }
        
        // Percorrendo todo o array e criando os elementos HTML necessários para preencher o front com o resultado.
        data.Search.forEach( e => {
            
            let item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `<img src="${e.Poster}"/> <h2>${e.Title}</h2>`
            list.appendChild(item);
            
        })

    }

});
