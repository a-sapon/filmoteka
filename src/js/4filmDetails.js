
const API_KEY = 'e9f6322f77334e3f0406d6b8eabd79ce';
const BASE_URL = 'https://api.themoviedb.org/3';

const wotched = document.querySelector(".btn-addWatch");
const queue = document.querySelector(".btn-addQueue");
const infoFilmsQueue = localStorage.getItem("filmsQueue");
const infoFilmsWatched = localStorage.getItem("filmsWatched");
// for rendering
const blockImg = document.querySelector(".details-block__block-img");
const listInfo = document.querySelector(".details-block__info--tech-info");
const descriptionBlock = document.querySelector(".details-block__info--about")
console.dir(descriptionBlock)

console.dir(blockImg)
function renderingDetailsPage(data) {
  let img = blockImg.firstChild;
  img.setAttribute("src", `https://image.tmdb.org/t/p/w500${data.poster_path}`);
  console.dir(img)
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
  if (e.target.nodeName === 'LI' || e.target.nodeName === 'H3') {
    const li = e.target.closest('.films_list-item');
    fetch(`${BASE_URL}/movie/${li.dataset.id}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        renderingDetailsPage(data);
      })
  };
}
