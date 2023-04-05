const apiKey = "4126197f";
const formSearch = document.querySelector("form");

formSearch.addEventListener("submit", (e) => {

    e.preventDefault();
    
    const search = e.target.search.value;

    if(search == ""){

        alert("Preencha o campo!");
        return;

    }

    const apiUrl = `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`;
    
    fetch(apiUrl).then( (response) => {

        return response.json()

    })
    .then( (data) => {

        console.log(data)
        carregaLista(data);

    })
    
    const carregaLista = ( data ) => {

        const list = document.querySelector("div.list");
        list.innerHTML = "";

        if(data.Response === "False"){
            alert("Nenhum filme encontrado");
            return;
        }

        data.Search.forEach( e => {
            console.log(e)
            let item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `<img src="${e.Poster}"/> <h2>${e.Title}</h2>`
            list.appendChild(item);
            
        })

    }

});