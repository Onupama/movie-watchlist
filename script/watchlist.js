const movies = JSON.parse(localStorage.getItem("moviesArr"));
const moviesContainer = document.getElementById("movies-container")
const watchlist = document.getElementById("watchlist")
const addMoviesBtn = document.getElementById("add-movies-btn")
const removeBtn = document.getElementsByClassName("remove-btn")
let arr = moviesContainer.children

document.addEventListener('click', function(event) {
    if(event.target.className === "remove-btn") {
        for(let i=0; i<removeBtn.length; i++) {
            if(removeBtn[i] === event.target) {
                removeFromWatchlist(i)
            }
        }
    }
})

addMoviesBtn.addEventListener('click', function(){
    watchlist.style.display = "none"
    const moviesHtml = movies.map(function(movie) {
        return `
                <section class="watchlist-movie">
                    <img src="${movie.Poster}" class="poster">
                    <div class="movie-info">
                        <div class="title">
                            <h2>${movie.Title}</h2>
                            <i class="fa-solid fa-star"></i>
                            <p class="rating">${movie.imdbRating}</p>
                        </div>
                        <div class="info">
                            <p class="time">${movie.Runtime}</p>
                            <p class="genre">${movie.Genre}</p>
                            <i class="fa-solid fa-circle-minus"></i>
                            <button class="remove-btn">Remove</button>
                        </div>
                        <p class="plot">${movie.Plot}</p>
                    </div>
                </section>
                `
    }).join('')
    moviesContainer.innerHTML = moviesHtml
})


function removeFromWatchlist(ind) {
    arr[ind].style.display = 'none'
    movies.splice(ind, 1)
    if(movies.length === 0) {
        watchlist.style.display = "block"
        moviesContainer.innerHTML = `
        <div id="watchlist" class="watchlist">
            <p>Your watchlist is looking a little empty...</p>
            <div class="add">
                <i class="fa-solid fa-circle-plus"></i>
                <button id="add-movies-btn" class="add-movies-btn">Let's add some movies!</button>
            </div>
        </div>
        `
    }
}


