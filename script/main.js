const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.getElementById("movies-container")
const initialState = document.getElementById("initial-state")
const watchlistBtn = document.getElementsByClassName("watchlist-btn")
let movieObj 
let moviesArr = []

document.addEventListener('click', function(event) {
    if(event.target.className === "watchlist-btn") {
        addToWatchlist()
    }
})

searchBtn.addEventListener('click', () => {
    initialState.style.display = "none"
    const movieName = searchInput.value
    if(movieName) {
        fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=d33b141a`)
            .then(res => {
                console.log(res)
                if (!res.ok) {
                    throw Error("Movie data not available")
                }
                return res.json()
            })
            .then(data => {
                movieObj = data
                console.log(data.Error)
                if(data.Title) {
                    moviesContainer.innerHTML += `
                        <section>
                            <img src="${data.Poster}" class="poster">
                            <div class="movie-info">
                                <div class="title">
                                    <h2>${data.Title}</h2>
                                    <i class="fa-solid fa-star"></i>
                                    <p class="rating">${data.imdbRating}</p>
                                </div>
                                <div class="info">
                                    <p class="time">${data.Runtime}</p>
                                    <p class="genre">${data.Genre}</p>
                                    <i class="fa-solid fa-circle-plus"></i>
                                    <button class="watchlist-btn">Watchlist</button>
                                </div>
                                <p class="plot">${data.Plot}</p>
                            </div>
                        </section>
                    `
                } else {
                    moviesContainer.textContent = `${data.Error}`
                }
                searchInput.value = ""
            })
            .catch(error => {
                console.error(error)
            })
    } else {
        initialState.textContent = "Unable to find what you're looking for. Please try another search."
        initialState.style.display = "block"
    }
})


function addToWatchlist() {
    moviesArr.push(movieObj)
    localStorage.setItem("moviesArr", JSON.stringify(moviesArr));
    if(moviesArr.length === 0) {
        localStorage.removeItem("moviesArr")
        localStorage.clear()
    }
}




// Title, Plot, Poster, Runtime, imdbRating, Genre
// http://www.omdbapi.com/?i=tt3896198&apikey=d33b141a
// http://www.omdbapi.com/?t=Guardians+of+the+Galaxy+Vol.+2&apikey=d33b141a
