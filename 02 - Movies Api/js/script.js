// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const apiKey = "4126197f";

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// Carrega os filmes da API
// na barra de pesquisa
async function loadMovies(searchTerm){
    
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();

    if(data.Response == "True"){

        displayMovieList(data.Search);
        
    } 

}

// Acha o filme atraves do valor passado na barra de pesquisa
function findMovies(){
    
    // O método trim() remove os espaços em branco (whitespaces) do início e/ou fim de um texto. 
    let searchTerm = (movieSearchBox.value).trim();

    // Caso o valor seja maior que 0, removemos a classList da lista de pesquisa
    // para que ela apareça e seja preenchida pelos filmes achados na API.
    if(searchTerm.length > 0){

        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);

    } else {

        searchList.classList.add('hide-search-list');

    }
}

function displayMovieList(movies){
    
    searchList.innerHTML = "";

    // For para percorrer o array de objetos movies.
    for(let i of movies){

        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = i.imdbID; // definindo o id do filme no data-id
        movieListItem.classList.add('search-list-item');

        // Se o filme tem um poster, vamos colocar o proprio poster como imagem
        // se não, colocamos uma imagem notfound, que temos na página images.
        if(i.Poster != "N/A"){

            moviePoster = i.Poster;

        }else{

            moviePoster = "images/image_not_found.png";

        } 

        // Criando os elementos HTML que irá renderizar no front
        // mostrando o poster do filme, nome e ano na barra de pesquisa.
        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${i.Title}</h3>
            <p>${i.Year}</p>
        </div>
        `;

        // O método appendChild() insere um novo nó na estrutura do DOM de um documento, 
        // e é a segunda parte do processo criar-e-adicionar tão importante na construção 
        // de páginas web programaticamente.
        searchList.appendChild(movieListItem);

    }

    loadMovieDetails();

}

function loadMovieDetails(){
    
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    
    // Percorrendo o array
    searchListMovies.forEach( movie => {

        // Quando o usuário seleciona um dos filmes da lista de resultados dos filmes
        // soltamos um evento pegando os detalhes do filmes e passando para a função 
        // displayMovieDetails que irá carregar na tela os detalhes do filme.
        movie.addEventListener('click', async () => {

            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${apiKey}`);
            const movieDetails = await result.json();
            console.log("2", movieDetails);
            displayMovieDetails(movieDetails);

        });

    });
}

// Função que renderiza na tela os detalhes do filme selecionado na lista de pesquisa.
function displayMovieDetails(details){
    
    // Criando os elementos HTML que vai mostrar na tela os detalhes do filme selecionado
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "images/image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>`;

}

// Este evento, é quando o usuário pesquisa um filme, e aperta fora da lista
// sem selecionar nenhum, a lista com os filmes some.
window.addEventListener('click', (event) => {

    if(event.target.className != "form-control"){

        searchList.classList.add('hide-search-list');

    }

});