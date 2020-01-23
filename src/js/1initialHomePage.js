'use strict';

const menuItem = document.querySelector('#menu-overlay')
const API_KEY = 'e9f6322f77334e3f0406d6b8eabd79ce';
const popularFilm = 'https://api.themoviedb.org/3/movie/550?api_key=e9f6322f77334e3f0406d6b8eabd79ce/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22'

fetch(popularFilm)