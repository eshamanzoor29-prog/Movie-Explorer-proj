// ======================================
// TMDB API
// ======================================

const API_KEY = "def253012485ddea58594f4cdb05fe68";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";


// ======================================
// HTML ELEMENTS
// ======================================

const movieContainer = document.getElementById("movieContainer");

const loading = document.getElementById("loading");

const searchInput = document.getElementById("searchInput");

const homeBtn = document.getElementById("homeBtn");

const moviesBtn = document.getElementById("moviesBtn");

const tvBtn = document.getElementById("tvBtn");

const popularBtn = document.getElementById("popularBtn");

const topRatedBtn = document.getElementById("topRatedBtn");

const upcomingBtn = document.getElementById("upcomingBtn");

const favBtn = document.getElementById("favBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const pages = document.querySelectorAll(".page");

const categoryButtons = document.querySelectorAll(".category button");

const modalGenres = document.getElementById("modalGenres");

const modalBudget = document.getElementById("modalBudget");

const modalCompany = document.getElementById("modalCompany");

const modalSpokenLanguage = document.getElementById("modalSpokenLanguage");

const sectionTitle = document.getElementById("sectionTitle");
// ======================================
// MODAL ELEMENTS
// ======================================

const movieModal = document.getElementById("movieModal");

const closeModal = document.getElementById("closeModal");

const modalPoster = document.getElementById("modalPoster");

const modalTitle = document.getElementById("modalTitle");

const modalRating = document.getElementById("modalRating");

const modalDate = document.getElementById("modalDate");

const modalLanguage = document.getElementById("modalLanguage");

const modalOverview = document.getElementById("modalOverview");


// ======================================
// VARIABLES
// ======================================

let currentPage = 1;

let currentSearch = "";

let currentCategory = "";

let currentType = "popular";

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// ======================================
// LOADING FUNCTIONS
// ======================================

function showLoading(){

    loading.style.display = "block";

    movieContainer.innerHTML = "";

}

function hideLoading(){

    loading.style.display = "none";

}


// ======================================
// PAGINATION
// ======================================

function updatePagination(){

    pages.forEach(page=>{

        page.classList.remove("active-page");

    });

    document
    .getElementById(`page${currentPage}`)
    .classList.add("active-page");

    prevBtn.disabled = currentPage === 1;

    nextBtn.disabled = currentPage === 3;

}


// ======================================
// FETCH DATA
// ======================================

async function fetchData(url){

    showLoading();

    try{

        const response = await fetch(url);

        const data = await response.json();

        displayMovies(data.results);

    }

    catch(error){

        movieContainer.innerHTML =

        "<h2>Something went wrong 😔</h2>";

    }

    hideLoading();

    updatePagination();

}

// ======================================
// HOME (POPULAR MOVIES)
// ======================================

function getPopularMovies(){

     sectionTitle.innerText = "🔥 Trending Movies";
    currentType = "popular";

    currentSearch = "";

    currentCategory = "";

    fetchData(

`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`

    );

}


// ======================================
// ALL MOVIES
// ======================================

function getMovies(){

    sectionTitle.innerText = "🎬 Movies";
    currentType = "movies";

    currentSearch = "";

    currentCategory = "";

    fetchData(

`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}`

    );

}


// ======================================
// TV SHOWS
// ======================================

function getTVShows(){

    sectionTitle.innerText = "📺 TV Shows";

    currentType = "tv";

    currentSearch = "";

    currentCategory = "";

    fetchData(

`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${currentPage}`

    );

}


// ======================================
// POPULAR
// ======================================

function getPopular(){

    sectionTitle.innerText = "🔥 Popular Movies";

    currentType = "popular";

    currentSearch = "";

    currentCategory = "";

    fetchData(

`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`

    );

}


// ======================================
// TOP RATED
// ======================================

function getTopRated(){

    sectionTitle.innerText = "⭐ Top Rated Movies";

    currentType = "top";

    currentSearch = "";

    currentCategory = "";

    fetchData(

`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${currentPage}`

    );

}


// ======================================
// UPCOMING
// ======================================

function getUpcoming(){

    sectionTitle.innerText = "🎥 Upcoming Movies";

    currentType = "upcoming";

    currentSearch = "";

    currentCategory = "";

    fetchData(

`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${currentPage}`

    );

}


// ======================================
// SEARCH MOVIES
// ======================================

function searchMovies(query){

    currentSearch = query;

    currentType = "search";

    fetchData(

`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${currentPage}`

    );

}


// ======================================
// GENRES
// ======================================

const genres = {

    "Action":28,

    "Comedy":35,

    "Drama":18,

    "Horror":27,

    "Adventure":12,

    "Animation":16,

    "Romance":10749,

    "Sci-Fi":878

};


// ======================================
// CATEGORY
// ======================================

function getCategoryMovies(category){

     sectionTitle.innerText = `🎬 ${category} Movies`;

    currentCategory = category;

    currentType = "category";

    fetchData(

`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres[category]}&page=${currentPage}`

    );

}

// ======================================
// DISPLAY MOVIES
// ======================================

function displayMovies(movies){

    movieContainer.innerHTML = "";

    if(movies.length === 0){

        movieContainer.innerHTML = "<h2>No Movies Found 😔</h2>";
        return;

    }

    movies.forEach(movie=>{

        const poster = movie.poster_path
        ? IMAGE_URL + movie.poster_path
        : "https://via.placeholder.com/300x450?text=No+Image";

        const alreadyFavourite = favourites.some(item=>item.id === movie.id);

        const card = `

        <div class="movie-card">

            <button
                class="favMovieBtn"
                data-id="${movie.id}"
                data-title="${movie.title || movie.name}"
                data-poster="${poster}"
                data-rating="${movie.vote_average}"
                data-date="${movie.release_date || movie.first_air_date}">
                ${alreadyFavourite ? "❤️" : "🤍"}
            </button>

            <img src="${poster}" alt="${movie.title || movie.name}">

            <div class="movie-info">

                <h3>${movie.title || movie.name}</h3>

                <p>⭐ ${movie.vote_average}</p>

                <p>📅 ${movie.release_date || movie.first_air_date}</p>

                <button
                    class="detailsBtn"
                    data-id="${movie.id}"
                    data-type="${movie.title ? "movie" : "tv"}">

                    View Details

                </button>

            </div>

        </div>

        `;

        movieContainer.innerHTML += card;

    });

}
// ======================================
// ADD TO FAVOURITES
// ======================================

document.addEventListener("click",function(e){

    if(e.target.classList.contains("favMovieBtn")){

        const id = Number(e.target.dataset.id);

        const exists = favourites.some(item=>item.id===id);

        if(exists){

            favourites = favourites.filter(item=>item.id!==id);

        }

        else{

           favourites.push({

    id: Number(e.target.dataset.id),

    title: e.target.dataset.title,

    poster_path: e.target.dataset.poster.replace(IMAGE_URL, ""),

    vote_average: e.target.dataset.rating,

    release_date: e.target.dataset.date

});

        }

        localStorage.setItem(

            "favourites",

            JSON.stringify(favourites)

        );

        if(currentSearch !== ""){

            searchMovies(currentSearch);

        }

        else if(currentCategory !== ""){

            getCategoryMovies(currentCategory);

        }

        else{

            switch(currentType){

                case "movies":

                    getMovies();

                    break;

                case "tv":

                    getTVShows();

                    break;

                case "top":

                    getTopRated();

                    break;

                case "upcoming":

                    getUpcoming();

                    break;

                default:

                    getPopularMovies();

            }

        }

    }

});


// ======================================
// VIEW DETAILS
// ======================================

document.addEventListener("click", async function(e){

    if(e.target.classList.contains("detailsBtn")){

        const id = e.target.dataset.id;

        const type = e.target.dataset.type;

        try{

            showLoading();


            const response = await fetch(

                `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`

            );


            const data = await response.json();


            hideLoading();


            // POSTER

            modalPoster.src = data.poster_path

            ? IMAGE_URL + data.poster_path

            : "https://via.placeholder.com/300x450?text=No+Image";


            // TITLE

            modalTitle.innerText = data.title || data.name;


            // RATING

            modalRating.innerText =

            `⭐ Rating: ${data.vote_average}/10`;


            // RELEASE DATE

            modalDate.innerText =

            `📅 Release: ${data.release_date || data.first_air_date || "Not Available"}`;


            // ORIGINAL LANGUAGE

            modalLanguage.innerText =

            `🌍 Language: ${data.original_language 
            ? data.original_language.toUpperCase()
            : "Not Available"}`;



            // COMPANY FIRST

            modalCompany.innerText =

            `🏢 Company: ${
            
            data.production_companies && data.production_companies.length > 0

            ? data.production_companies
            .map(company => company.name)
            .join(", ")

            : "Not Available"

            }`;



            // BUDGET

            modalBudget.innerText =

            `💰 Budget: ${
            
            data.budget && data.budget > 0

            ? "$" + data.budget.toLocaleString()

            : "Not Available"

            }`;



            // GENRES WITH ID

            modalGenres.innerText =

            `🎬 Genres: ${
            
            data.genres && data.genres.length > 0

            ? data.genres
            .map(genre => `${genre.name} `)
            .join(", ")

            : "Not Available"

            }`;



            // SPOKEN LANGUAGE

            modalSpokenLanguage.innerText =

            `🗣 Spoken Language: ${
            
            data.spoken_languages && data.spoken_languages.length > 0

            ? data.spoken_languages
            .map(lang => lang.english_name)
            .join(", ")

            : "Not Available"

            }`;



            // DESCRIPTION LAST

            modalOverview.innerText =

            data.overview || "No description available.";



            // OPEN MODAL

            movieModal.style.display = "flex";


        }


        catch(error){

            hideLoading();

            console.log(error);

            alert("Unable to load movie details.");

        }


    }

});


// ======================================
// CLOSE MODAL
// ======================================

closeModal.addEventListener("click", function(){

    movieModal.style.display = "none";

       loadCurrentPage();

});


window.addEventListener("click", function(e){

    if(e.target === movieModal){

        movieModal.style.display = "none";
        
           loadCurrentPage();
    }

});

// ======================================
// ACTIVE NAV BUTTON
// ======================================

const navButtons = document.querySelectorAll("nav li");


function setActiveNav(button){

    navButtons.forEach(btn=>{

        btn.classList.remove("active");

    });

    button.classList.add("active");

}
// ======================================
// NAVIGATION BUTTONS
// ======================================

homeBtn.addEventListener("click",function(){

    currentPage = 1;

    getPopularMovies();
     setActiveNav(homeBtn);

});

moviesBtn.addEventListener("click",function(){

    currentPage = 1;
    setActiveNav(moviesBtn);

    getMovies();

});

tvBtn.addEventListener("click",function(){

    currentPage = 1;
    setActiveNav(tvBtn);

    getTVShows();

});

popularBtn.addEventListener("click",function(){

    currentPage = 1;
setActiveNav(popularBtn);
    getPopular();

});

topRatedBtn.addEventListener("click",function(){

    currentPage = 1;
    setActiveNav(topRatedBtn);

    getTopRated();

});

upcomingBtn.addEventListener("click",function(){

    currentPage = 1;
    setActiveNav(upcomingBtn);

    getUpcoming();

});


// ======================================
// SEARCH
// ======================================

searchInput.addEventListener("keyup",function(e){

    if(e.key === "Enter"){

        currentPage = 1;

        searchMovies(searchInput.value);

    }

});


// ======================================
// CATEGORY BUTTONS
// ======================================

categoryButtons.forEach(button=>{

    button.addEventListener("click",function(){

        categoryButtons.forEach(btn=>{

            btn.classList.remove("active-category");

        });

        this.classList.add("active-category");

        currentPage = 1;

        const category = this.innerText;

        if(category === "All"){

            getPopularMovies();

        }

        else{

            getCategoryMovies(category);

        }

    });

});


// ======================================
// PAGINATION
// ======================================

prevBtn.addEventListener("click",function(){

    if(currentPage > 1){

        currentPage--;

        loadCurrentPage();

    }

});

nextBtn.addEventListener("click",function(){

    if(currentPage < 3){

        currentPage++;

        loadCurrentPage();

    }

});

pages.forEach(page=>{

    page.addEventListener("click",function(){

        currentPage = Number(this.innerText);

        loadCurrentPage();

    });

});


// ======================================
// LOAD CURRENT PAGE
// ======================================

function loadCurrentPage(){

    if(currentSearch !== ""){

        searchMovies(currentSearch);

    }

    else if(currentCategory !== ""){

        getCategoryMovies(currentCategory);

    }

    else{

        switch(currentType){

            case "movies":

                getMovies();
                break;

            case "tv":

                getTVShows();
                break;

            case "top":

                getTopRated();
                break;

            case "upcoming":

                getUpcoming();
                break;

            case "popular":

                getPopular();
                break;

            default:

                getPopularMovies();

        }

    }

}


// ======================================
// SHOW FAVOURITES
// ======================================

favBtn.addEventListener("click",function(){

    movieContainer.innerHTML = "";

    if(favourites.length === 0){

        movieContainer.innerHTML =

        "<h2>No Favourite Movies ❤️</h2>";

        return;

    }

    displayMovies(favourites);

});


// ======================================
// FIRST LOAD
// ======================================

getPopularMovies();