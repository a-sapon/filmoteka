// 'use strict';

// const API_KEY = 'e9f6322f77334e3f0406d6b8eabd79ce';
// const BASE_URL = 'https://api.themoviedb.org/3';

// // all popular movies
// // // https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=1
// const URLforFetchPopular = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`;

// const refs = {
//   searchForm: document.querySelector('.search-form'),
//   searchInput: document.querySelector('input[name="search"]'),
//   filmsContainer: document.querySelector('.films_list'),
// };

// refs.searchForm.addEventListener('submit', searchFilms);

// function searchFilms(e) {
//   e.preventDefault();
//   const page = 1;
//   fetch(
//     `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${refs.searchInput.value}&page=${page}&include_adult=true`,
//   )
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       data.results.map(film => {
//         const markup = `
//       <li class="films_list-item">
//         <a href="#">
//           <img 
//             src="https://image.tmdb.org/t/p/w500${film.backdrop_path}"
//             alt="${film.title} image"
//             class="films_list-item-image"
//           >
//           <h3 class="films_list-item-title">${film.title}</h3>
//         </a>
//       </li>
//       `;
//         refs.filmsContainer.insertAdjacentHTML('beforeend', markup);
//       });
//     });
// }