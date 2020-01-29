const homeBtn = document.querySelector('.home');
const libraryBtn = document.querySelector('.library');
const logoLink = document.getElementById('navigation-logo');
const preloader = document.querySelector('.preloader-wrapper');

libraryBtn.addEventListener('click', activeLibraryPage);
homeBtn.addEventListener('click', activeHomePage);
logoLink.addEventListener('click', resetAll);

const homePage = document.querySelector('.home-page');
const detailsPage = document.querySelector('.details_page');
const libraryPage = document.getElementById('library-page');

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

function resetAll() {
  activeHomePage();
  fetchPopularMoviesList();
}

function enablePreloader() {
  document.body.style.opacity = '0.5';
  preloader.style.display = 'block';
}

function disablePreloader() {
  document.body.style.opacity = '1';
  preloader.style.display = 'none';
}

const overlay = document.querySelector('.modal-overlay');

document.querySelector('.footer-title').addEventListener('click', showModal);
overlay.addEventListener('click', closeModal);

function showModal() {
  overlay.classList.remove('hide');
  overlay.classList.add('show');
}

function closeModal(e) {
  if (
    e.target.classList.contains('close-icon') ||
    e.target.classList.contains('modal-overlay')
  ) {
    overlay.classList.add('hide');
    overlay.classList.remove('show');
  }
}