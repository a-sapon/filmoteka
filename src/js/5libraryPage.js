const libraryRefs = {
  watchedBtn: document.getElementById('watched-btn'),
  queueBtn: document.getElementById('watch-later-btn')
};

libraryRefs.watchedBtn.addEventListener('click', showWatchedMovies);
libraryRefs.queueBtn.addEventListener('click', showQueue);

function showWatchedMovies() {
  refs.filmsContainer.innerHTML = '';
  // need to change this to WATCHED instead of popular
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${filmsInfo.page}`)
    .then(response => response.json())
    .then(data => {
      createMarkupForLibrary(data.results);
    });
}

function showQueue() {
  refs.filmsContainer.innerHTML = '';
  // need to change this to QUEUE FILMS instead of popular
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${filmsInfo.page}`)
    .then(response => response.json())
    .then(data => {
      createMarkupForLibrary(data.results);
    });
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
  refs.filmsContainer.insertAdjacentHTML('beforeend', markup);
}