const watched = document.querySelector('.btn-addWatch');
const queue = document.querySelector('.btn-addQueue');

let infoFilmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));
let infoFilmsWatched = JSON.parse(localStorage.getItem('filmsWatched'));
let selectedFilm;

if (!infoFilmsQueue) {
  infoFilmsQueue = [];
}
if (!infoFilmsWatched) {
  infoFilmsWatched = [];
}

// for rendering
const titleFilm = document.querySelector('.title-moive');
const homePage = document.querySelector('.home-page');
const libraryPage = document.querySelector('.library-page');
const detailsPage = document.querySelector('.details_page');
const blockImg = document.querySelector('.details-block__block-img');
const listInfo = document.querySelector('.details-block__info--tech-info');
const descriptionBlock = document.querySelector('.details-block__info--about');

queue.addEventListener('click', toggleToQueue);
watched.addEventListener('click', toggleToWatched);

function openClickedFilm(e) {
  homePage.style.display = 'none';
  libraryPage.style.display = 'none';
  detailsPage.style.display = 'block';
  if (e.target.nodeName === 'LI' || e.target.nodeName === 'H3') {
    const li = e.target.closest('.films_list-item');
    fetch(`${BASE_URL}/movie/${li.dataset.id}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        selectedFilm = data;
        renderDetailsPage(selectedFilm);

        infoFilmsQueue.map(film => {
          if(film.id === selectedFilm.id) {
            queue.innerText = 'Delete from queue';
            
          }
        });

        infoFilmsWatched.map(film => {
          if(film.id === selectedFilm.id) {
            watched.innerText = 'Delete from watched';
            
          }
        })
      });
  }
}

function renderDetailsPage(data) {
  blockImg.firstChild.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  titleFilm.innerHTML = data.title;
  listInfo.children[0].lastElementChild.innerText = `${data.vote_average} / ${data.vote_count}`;
  listInfo.children[1].lastElementChild.innerText = data.popularity;
  listInfo.children[2].lastElementChild.innerText = data.original_title;
  listInfo.children[3].lastElementChild.innerText = data.genres
    .map(elem => elem.name)
    .join(', ');
  descriptionBlock.lastElementChild.innerText = data.overview;
}

function toggleToQueue() {
  if(queue.innerText === 'Add to queue') {
    queue.innerText = 'Delete from queue';
    infoFilmsQueue.push(selectedFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(infoFilmsQueue));
  } else if(queue.innerText === 'Delete from queue') {
    queue.innerText = 'Add to queue';
    let index = infoFilmsQueue.indexOf(selectedFilm);
    infoFilmsQueue.splice(index, 1);
    localStorage.setItem('filmsQueue', JSON.stringify(infoFilmsQueue));
  }
}

function toggleToWatched() {
  if(watched.innerText === 'Add to watched') {
    watched.innerText = 'Delete from watched';
    infoFilmsWatched.push(selectedFilm);
    localStorage.setItem('filmsWatched', JSON.stringify(infoFilmsWatched));
  } else if(watched.innerText === 'Delete from watched') {
    watched.innerText = 'Add to watched';
    let index = infoFilmsWatched.indexOf(selectedFilm);
    infoFilmsWatched.splice(index, 1);
    localStorage.setItem('filmsWatched', JSON.stringify(infoFilmsWatched));
  }
}