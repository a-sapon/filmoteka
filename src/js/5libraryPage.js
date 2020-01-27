const libraryRefs = {
  watchedBtn: document.getElementById('watched-btn'),
  queueBtn: document.getElementById('watch-later-btn'),
  libraryList: document.getElementById('library-list'),
  libraryStub: document.getElementById('library-stub'),
};

libraryRefs.watchedBtn.addEventListener('click', showWatchedMovies);
libraryRefs.queueBtn.addEventListener('click', showQueue);

function showWatchedMovies() {
  const watchedFilms = JSON.parse(localStorage.getItem('filmsWatched'));
  libraryRefs.queueBtn.classList.remove('active');
  libraryRefs.watchedBtn.classList.add('active');

  if (watchedFilms !== null) {
    libraryRefs.libraryList.style.display = 'flex';
    libraryRefs.libraryStub.style.display = 'none';
    libraryRefs.libraryList.innerHTML = '';
    createMarkupForLibrary(watchedFilms);
  } else {
    libraryRefs.libraryList.style.display = 'none';
    libraryRefs.libraryList.innerHTML = '';
    libraryRefs.libraryStub.style.display = 'flex';
  }
}

libraryRefs.queueBtn.classList.add('active');

function showQueue() {
  const quequeFilms = JSON.parse(localStorage.getItem('filmsQueue'));
  libraryRefs.watchedBtn.classList.remove('active');
  libraryRefs.queueBtn.classList.add('active');
  if (quequeFilms !== null) {
    libraryRefs.libraryList.style.display = 'flex';
    libraryRefs.libraryStub.style.display = 'none';
    libraryRefs.libraryList.innerHTML = '';
    createMarkupForLibrary(quequeFilms);
  } else {
    libraryRefs.libraryList.style.display = 'none';
    libraryRefs.libraryList.innerHTML = '';
    libraryRefs.libraryStub.style.display = 'flex';
  }
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
