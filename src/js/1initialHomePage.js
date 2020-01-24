'use strict';

const menuItem = document.querySelector('#menu-overlay')
const API_KEY = 'e9f6322f77334e3f0406d6b8eabd79ce';
const BASE_URL = `https://api.themoviedb.org//discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc?api_key=e9f6322f77334e3f0406d6b8eabd79ce`
const ACCSES_TOKEN = ``

fetch(BASE_URL).then(res => res).then(data => console.log(data))

console.log()