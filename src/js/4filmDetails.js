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
const pageDetail = document.querySelector('.details_page');
const blockImg = document.querySelector('.details-block__block-img');
const listInfo = document.querySelector('.details-block__info--tech-info');
const descriptionBlock = document.querySelector('.details-block__info--about');

queue.addEventListener('click', toggleToQueue);
watched.addEventListener('click', toggleToWatched);

function openClickedFilm(e) {
  homePage.style.display = 'none';
  pageDetail.style.display = 'block';
  if (e.target.nodeName === 'LI' || e.target.nodeName === 'H3') {
    const li = e.target.closest('.films_list-item');
    fetch(`${BASE_URL}/movie/${li.dataset.id}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        selectedFilm = data;
        renderDetailsPage(selectedFilm);
      });
  }
}

function renderDetailsPage(data) {
  blockImg.firstChild.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  titleFilm.innerHTML = data.title;
  listInfo.children[0].lastElementChild.innerText = `${data.vote_average} / ${data.vote_count}`;
  listInfo.children[1].lastElementChild.innerText = data.popularity;
  listInfo.children[2].lastElementChild.innerText = data.original_title;
  listInfo.children[3].lastElementChild.innerText = data.genres.map(elem => elem.name).join(', ');
  descriptionBlock.lastElementChild.innerText = data.overview;
}

function toggleToQueue() {
  if (infoFilmsQueue.includes(selectedFilm.id)) {
    let index = infoFilmsQueue.indexOf(selectedFilm.id);
    infoFilmsQueue.splice(index, 1);
  } else {
    infoFilmsQueue.push(selectedFilm);
  }
  localStorage.setItem('filmsQueue', JSON.stringify(infoFilmsQueue));
  monitorButtonStatusText(selectedFilm.id, 'filmsQueue');
}
function toggleToWatched() {
  if (infoFilmsWatched.includes(selectedFilm.id)) {
    let index = infoFilmsWatched.indexOf(selectedFilm.id);
    infoFilmsWatched.splice(index, 1);
  } else {
    infoFilmsWatched.push(selectedFilm);
  }
  localStorage.setItem('filmsWatched', JSON.stringify(infoFilmsWatched));
  monitorButtonStatusText(selectedFilm.id, 'filmsWatched');
}
// function checkButton() {
//   let resultInfoFilmsQueue = parse.JSON(localStorage.getItem('filmsQueue'));
//   console.dir(resultInfoFilmsQueue)
//   if (resultInfoFilmsQueue.includes(id)) {
//     queue.innerText ='Delete from queue';
//    };

// }
function monitorButtonStatusText(id, keyStorage) {
  switch (keyStorage) {
    case 'filmsQueue':
      queue.innerText = infoFilmsQueue.includes(id)
        ? 'Delete from queue'
        : 'Add to queue';
      break;
    case 'filmsWatched':
      watched.innerText = infoFilmsWatched.includes(id)
        ? 'Delete from watched'
        : 'Add to watched';
      break;
  }
}