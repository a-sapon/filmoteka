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

// https://api.themoviedb.org/3/find/38700?api_key=e9f6322f77334e3f0406d6b8eabd79ce&language=en-US&external_source=imdb_id

const filmsService = {
  page: 1,
  value: '',
  incrementPage() {
    this.page += 1;
  },
  decrementPage() {
    this.page -= 1;
  },
  resetPage() {
    this.page = 1;
  },
  fetchFilms(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length !== 0) {
          data.results.map(film => {
            const markup = `
          <li data-id="${film.id}" class="films_list-item">
            <img 
              src="https://image.tmdb.org/t/p/w500${film.backdrop_path}"
              alt="${film.title} image"
              class="films_list-item-image"
            >
            <h3 class="films_list-item-title">${film.title}</h3>
          </li>
          `;
            refs.filmsContainer.insertAdjacentHTML('beforeend', markup);
          });

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
  }
};
refs.searchForm.addEventListener('submit', searchFilms);
refs.btnNext.addEventListener('click', loadNextPage);
refs.btnNext.addEventListener('click', loadNextDefaultPage);
refs.btnPrev.addEventListener('click', loadPrevPage);
document.addEventListener('DOMContentLoaded', homePageFilm);
refs.filmsContainer.addEventListener('click', openClickedFilm);
refs.paginationPage.textContent = filmsService.page;

function searchFilms(e) {
  e.preventDefault();
  filmsService.resetPage();
  refs.filmsContainer.innerHTML = '';
  filmsService.value = refs.searchInput.value;
  filmsService.fetchFilms(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${filmsService.value}&page=${filmsService.page}&include_adult=true`);
  refs.searchInput.value = '';
}
function loadNextPage() {
  refs.filmsContainer.innerHTML = '';
  filmsService.incrementPage();
  refs.paginationPage.textContent = filmsService.page;
  filmsService.fetchFilms(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${filmsService.value}&page=${filmsService.page}&include_adult=true`)
  refs.searchInput.value = '';
  refs.btnPrev.disabled = false;
}

function loadNextDefaultPage() {
  refs.filmsContainer.innerHTML = '';
  filmsService.fetchFilms(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${filmsService.page}`);
  refs.searchInput.value = '';
  refs.btnPrev.disabled = false;
}

function loadPrevPage() {
  refs.filmsContainer.innerHTML = '';
  filmsService.decrementPage();
  refs.paginationPage.textContent = filmsService.page;
  filmsService.fetchFilms(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${filmsService.page}`)
  refs.searchInput.value = '';
  if (filmsService.page < 2) {
    refs.btnPrev.disabled = true;
  }
}

function homePageFilm() {
  filmsService.fetchFilms(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${filmsService.page}`);
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
// console.log(genres)
