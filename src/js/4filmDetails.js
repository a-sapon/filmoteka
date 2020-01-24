
const API_KEY = 'e9f6322f77334e3f0406d6b8eabd79ce';
const BASE_URL = 'https://api.themoviedb.org/3';

const wotched = document.querySelector(".btn-addWatch");
const queue = document.querySelector(".btn-addQueue");
const infoFilmsQueue = localStorage.getItem("filmsQueue");
const infoFilmsWatched = localStorage.getItem("filmsWatched");

