const homeBtn = document.querySelector('.home');
const libraryBtn = document.querySelector('.library');
const logoLink = document.getElementById('navigation-logo');

libraryBtn.addEventListener('click', activeLibraryPage);
homeBtn.addEventListener('click', activeHomePage);
logoLink.addEventListener('click', activeHomePageWithPopularMovies);

const homePage = document.querySelector('.home-page');
const detailsPage = document.querySelector('.details_page');
const libraryPage = document.getElementById('library-page');

function activeHomePageWithPopularMovies() {
  activeHomePage();
  fetchPopularMoviesList();
}

function activeHomePage() {
  libraryBtn.classList.remove('nav__btn-active');
  homeBtn.classList.add('nav__btn-active');
  homePage.style.display = 'block';
  libraryPage.style.display = 'none';
  detailsPage.style.display = 'none';
}

function activeLibraryPage() {
  homeBtn.classList.remove('nav__btn-active');
  libraryBtn.classList.add('nav__btn-active');
  libraryPage.style.display = 'block';
  homePage.style.display = 'none';
  detailsPage.style.display = 'none';
  showQueue();
}
