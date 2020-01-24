const LIBRARY_REFS = {
  LIBRARY_LIST: document.getElementById('my-library-list'),
  WATCHED_BTN: document.getElementById('watched-btn'),
  WATCH_LATTER_BTN: document.getElementById('watch-later-btn'),
};

LIBRARY_REFS.WATCHED_BTN.addEventListener('click', handleShowWatchedMovies);
LIBRARY_REFS.WATCH_LATTER_BTN.addEventListener('click', handleShowLaterMoviesCollection);


function handleShowWatchedMovies() {
  LIBRARY_REFS.LIBRARY_LIST.innerHTML = '';
  return fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=1',
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const markup = data.results.reduce((acc, film) => {
        acc += `<li class="library-list__movie">
            <a href="#" class="library-list__movie-link">
              <img
                class="library-list__movie-link--image"
                src=https://image.tmdb.org/t/p/w500${film.poster_path}
                alt="${film.original_title}"
              />
              <h5 class="library-list__movie-link--title">
                ${film.original_title} (<span>${film.release_date}</span>)
              </h5>
              <p class="library-list__movie-rating">${film.vote_average}</p>
            </a>
          </li>`;
        return acc;
      }, '');
      LIBRARY_REFS.LIBRARY_LIST.insertAdjacentHTML('beforeend', markup);
    });
}

function handleShowLaterMoviesCollection() {
    LIBRARY_REFS.LIBRARY_LIST.innerHTML = '';
  return fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=2',
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const markup = data.results.reduce((acc, film) => {
        acc += `<li class="library-list__movie">
            <a href="#" class="library-list__movie-link">
              <img
                class="library-list__movie-link--image"
                src=https://image.tmdb.org/t/p/w500${film.poster_path}
                alt="${film.original_title}"
              />
              <h5 class="library-list__movie-link--title">
                ${film.original_title} (<span>${film.release_date}</span>)
              </h5>
              <p class="library-list__movie-rating">${film.vote_average}</p>
            </a>
          </li>`;
        return acc;
      }, '');
      LIBRARY_REFS.LIBRARY_LIST.insertAdjacentHTML('beforeend', markup);
    });
}

// вешает на нее слушателем функцию activeDetailsPage c параметрами movieId и флагом true так как фильм из библиотеки (смотри пункт “3)” создание activeDetailsPage);
