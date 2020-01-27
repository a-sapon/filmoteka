const homeBtn = document.querySelector('.home');
const libraryBtn = document.querySelector('.library');

libraryBtn.addEventListener('click', activeLibraryPage)

// homePage
// detailsPage
const libraryPage = document.querySelector('.library-page');

function activeHomePage() {
  homePage.style.display = 'block';
  libraryPage.style.display = 'none';
  detailsPage.style.display = 'none';
}

function activeLibraryPage() {
  libraryPage.style.display = 'block';
  homePage.style.display = 'none';
  detailsPage.style.display = 'none';
  showQueue();
}