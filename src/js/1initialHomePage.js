'use strict';

const API_KEY = 'e9f6322f77334e3f0406d6b8eabd79ce';
const BASE_URL = 'https://api.themoviedb.org/3';

const refs = {
  homePageContainer: document.querySelector('.container'),
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('input[name="search"]'),
  filmsContainer: document.querySelector('.films_list'),
  paginationPage: document.querySelector('.pagination_page'),
  btnNext: document.querySelector('.next'),
  btnPrev: document.querySelector('.prev')
};

const filmsService = {
  page: 1,
  value: '',
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
  fetchFilms(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data.results.length !== 0) {
          data.results.map(film => {
            const markup = `
          <li class="films_list-item">
            <a href="#">
              <img 
                src="https://image.tmdb.org/t/p/w500${film.backdrop_path}"
                alt="${film.title} image"
                class="films_list-item-image"
              >
              <h3 class="films_list-item-title">${film.title}</h3>
            </a>
          </li>
          `;
            refs.filmsContainer.insertAdjacentHTML('beforeend', markup);
          });
          this.incrementPage();
          
        } else {
          const errorDiv = document.createElement('div');
          errorDiv.classList.add('error');
          errorDiv.textContent = 'No results found. Please check your spelling';
          errorDiv.style.marginBottom = '36px';
          refs.homePageContainer.insertBefore(errorDiv, refs.filmsContainer);
          setTimeout(() => {
            errorDiv.remove();
          }, 2000);
        }
      })
      .catch(e => console.log(e));
      console.log(this.page);
  }
};

refs.searchForm.addEventListener('submit', searchFilms);
refs.btnNext.addEventListener('click', loadNextPage);
document.addEventListener('DOMContentLoaded', homePageFilm);
refs.paginationPage.textContent = filmsService.page;

function searchFilms(e) {
  e.preventDefault();
  filmsService.resetPage();
  refs.filmsContainer.innerHTML = '';
  filmsService.value = refs.searchInput.value;
  filmsService.fetchFilms(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.value}&page=${this.page}&include_adult=true`);
  refs.searchInput.value = '';
}

function loadNextPage() {
  console.log('loadNextPage')
  refs.filmsContainer.innerHTML = '';
  filmsService.fetchFilms();
  refs.searchInput.value = '';
  refs.paginationPage.textContent = filmsService.page;
  refs.btnPrev.disabled = false;
}






// MAXIM:

function homePageFilm() {
  filmsService.fetchFilms(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${filmsService.page}`);

  // fetch(
  //   `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`,
  // ).then(response => response.json()).then(data => {
  //     data.results.map(film => {
  //       const markup = `
  //     <li class="films_list-item">
  //       <a href="#">
  //         <img 
  //           src="https://image.tmdb.org/t/p/w500${film.backdrop_path}"
  //           alt="${film.title} image"
  //           class="films_list-item-image"
  //         >
  //         <h3 class="films_list-item-title">${film.title}</h3>
  //       </a>
  //     </li>
  //     `;
  //       refs.filmsContainer.insertAdjacentHTML('beforeend', markup);
  //     })
  //   });
}

function genreFilms() {
  const genres = [];
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`)
  .then(response => response.json())
  .then(data => {
    data.results.map(film => {
      genres.push(film.genre_ids)
    });
  });
  return genres;
}

// usages exmple:
const genres = genreFilms();
console.log(genres)