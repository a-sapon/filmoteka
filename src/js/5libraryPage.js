const libraryRefs = {
  watchedBtn: document.getElementById('watched-btn'),
  queueBtn: document.getElementById('watch-later-btn'),
  libraryList: document.getElementById('library-list'),
};

libraryRefs.watchedBtn.addEventListener('click', showWatchedMovies);
libraryRefs.queueBtn.addEventListener('click', showQueue);

function showWatchedMovies() {
  libraryRefs.libraryList.innerHTML = '';
  // need to change this to WATCHED instead of popular
  const watchedFilms = JSON.parse(localStorage.getItem('filmsWatched'));
  createMarkupForLibrary(watchedFilms);
}

function showQueue() {
  libraryRefs.libraryList.innerHTML = '';
  const quequeFilms = JSON.parse(localStorage.getItem('filmsQueue'));
  createMarkupForLibrary(quequeFilms);
}

function createMarkupForLibrary(arr) {
  const markup = arr.reduce((acc, film) => {
    acc += `<li data-id="${film.id}" class="films_list-item">
              <img
                src="https://image.tmdb.org/t/p/w500${film.backdrop_path}"
                alt="${film.original_title} image"
                class="films_list-item-image"
              />
              <h3 class="films_list-item-title">
                ${film.original_title} (<span>${film.release_date}</span>)
              </h3>
              <p class="films_list-item-rating">${film.vote_average}</p>
            </li>`;
    return acc;
  }, '');
  libraryRefs.libraryList.insertAdjacentHTML('beforeend', markup);
}
