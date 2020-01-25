
const API_KEY = 'e9f6322f77334e3f0406d6b8eabd79ce';
const BASE_URL = 'https://api.themoviedb.org/3';

let watched = document.querySelector(".btn-addWatch");
let queue = document.querySelector(".btn-addQueue");
let infoFilmsQueue = JSON.parse(localStorage.getItem("filmsQueue"));
let infoFilmsWatched = JSON.parse(localStorage.getItem("filmsWatched"));
let selectFilm;

if(!infoFilmsQueue){
  infoFilmsQueue=[];
}
if(!infoFilmsWatched){
  infoFilmsWatched=[];
}

// for rendering
const homePage = document.querySelector(".home-page")
const pageDetail = document.querySelector(".details_page");
const blockImg = document.querySelector(".details-block__block-img");
const listInfo = document.querySelector(".details-block__info--tech-info");
const descriptionBlock = document.querySelector(".details-block__info--about")

function renderingDetailsPage(data) {
  let img = blockImg.firstChild;
  img.setAttribute("src", `https://image.tmdb.org/t/p/w500${data.poster_path}`);
  let titleList = listInfo.firstElementChild;
  titleList.innerHTML = data.title;
  let voteVotes = listInfo.children[1].lastElementChild;
  voteVotes.innerText = `${data.vote_average} / ${data.vote_count}`;
  let popularity = listInfo.children[2].lastElementChild;
  popularity.innerText = data.popularity;
  let originalTitle = listInfo.children[3].lastElementChild;
  originalTitle.innerText = data.original_title;
  let gener = listInfo.children[4].lastElementChild;
  gener.innerText = data.genres.map(elem => elem.name);
  let description = descriptionBlock.lastElementChild;
  description.innerText = data.overview;
}

function openClickedFilm(e) {
  homePage.style.display = "none";
  pageDetail.style.display = "block";
  if (e.target.nodeName === 'LI' || e.target.nodeName === 'H3') {
    const li = e.target.closest('.films_list-item');
    fetch(`${BASE_URL}/movie/${li.dataset.id}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        selectFilm = data;
        renderingDetailsPage(data);
      })
  };
}


function monitorButtonStatusText(id, keyStorage) {
  switch (keyStorage) {
    case "filmsQueue":
      queue.lastElementChild.innerText = infoFilmsQueue.includes(id) ?
        "Delete from queue" :
        "Add to queue";
      break;
    case "filmsWatched":
      watched.lastElementChild.innerText = infoFilmsWatched.includes(id) ?
        "Delete from watched" :
        "Add to watched";
      break;
  }
}

function toggleToQueue() {
  if(infoFilmsQueue.includes(selectFilm.id)){
    let index= infoFilmsQueue.indexOf(selectFilm.id);
    infoFilmsQueue.splice(index,1);
  }else{
    infoFilmsQueue.push(selectFilm.id);
  }
  localStorage.setItem("filmsQueue",JSON.stringify(infoFilmsQueue));
  monitorButtonStatusText(selectFilm.id,"filmsQueue");
}
function  toggleToWatched(){
  if (infoFilmsWatched.includes(selectFilm.id)){
    let index=infoFilmsWatched.indexOf(selectFilm.id);
    infoFilmsWatched.splice(index,1);
  }else{
    infoFilmsWatched.push(selectFilm.id);
  }
  localStorage.setItem("filmsWatched",JSON.stringify(infoFilmsWatched));
  monitorButtonStatusText(selectFilm.id,"filmsWatched")
}

queue.addEventListener("click", toggleToQueue);
watched.addEventListener("click",toggleToWatched);