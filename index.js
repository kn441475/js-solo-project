function searchActive(value) {
  const input = document.querySelector(".nav__input");
  input.focus();
}

async function searchBarEnter(event) {
  let value = document.querySelector(".nav__input").value;
  const input = document.querySelector(".nav__input");

  if (event.keyCode == 13) {
    if (input === document.activeElement) {
      searchResult(value);
      await moviesSearch(value)
      return setTimeout(() =>loadingDone(), 1000)
    }
    value = document.querySelector(".movie__input").value;
    searchResult(value);
    await moviesSearch(value);
    setTimeout(() =>loadingDone(), 1000)
  }
}

async function searchBarClick() {
  const value = document.querySelector(".movie__input").value;

  searchResult(value);
  await moviesSearch(value)
  setTimeout(() =>loadingDone(), 1000)   
}

function searchResult(value) {
  const searchBar = document.querySelector(".movies__top");

  const searchResult = document.querySelector(".movie__search--result");

  const searchBarHTML = `<h2 class="movies__top--title">
  Search results for:
</h2>
<h2 class="movie__search--result">"${value}"</h2>`;

  searchBar.innerHTML = searchBarHTML;

  searchBar.classList.add("movie__search--result-visible");
}

async function moviesSearch(value) {

  const response = await fetch(
    `https://omdbapi.com/?type=movie&apikey=28c39af6&s=${value}`
  );

  const searchResults = await response.json();

  const array = await searchResults.Search.slice(0, 6);

  const movies = document.querySelector(".movies__list");

  const moviesHTML = array
  .map(
    (movie) => `
<div class="movie movie__invisible">
<figure class="movie__img--wrapper">
  <img src="${movie.Poster}" alt="" class="movie__img">
  <h3 class="movie__info--title">${movie.Title}</h3>
  <div class="movie__info--list">
    <div class="movie__info">
      <i class="fa-solid fa-clock movie__info--icon"></i>
      <p class="movie__info--text">136m</p>
    </div>
    <div class="movie__info">
      <i class="fa-solid fa-star movie__info--icon"></i>
      <p class="movie__info--text">4.5</p>
    </div>
    <div class="movie__info">
      <i class="fa-solid fa-earth-americas movie__info--icon"></i>
      <p class="movie__info--text">English</p>
    </div>
  </div>
</figure>
<h4 class="movie__title">${movie.Title}</h4>
</div>`
  )
  .join("");

   movies.innerHTML =
      `<i class="fa-solid fa-spinner movies__list--loading movies__list--loading-visible"></i>
` + moviesHTML

console.log('pending')
  }


function loadingDone() {
  const targetMovie = document.querySelectorAll('.movie');

  const targetLoading = document.querySelector(".movies__list--loading");

  targetLoading.classList.remove("movies__list--loading-visible");
  targetMovie.forEach((movie) => movie.classList.remove("movie__invisible") )


  console.log('removed')
}