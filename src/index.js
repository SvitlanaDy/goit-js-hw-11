import Notiflix from 'notiflix';
import fetchApi from './scripts/fetchApi';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchData from "./scripts/fetchApi";


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSubmit)

function onSubmit(e){
e.preventDefault();

const form = e.currentTarget;
const value = form.elements.searchQuery.value.trim();
fetchData(value)
.then(({ hits }) => {
    if (hits.length === 0) throw new Error(
        "Sorry, there are no images matching your search query. Please try again.");

    return hits.reduce((markup, hits) => 
    createMarkup(hits) + markup, "");
})
.then(updateGallery)
.catch(onError)     //!!!!!!!!!!!!!!!!!!!!!!!
.finally(() => form.reset());
}

function updateGallery(markup) {
    gallery.innerHTML= markup || '';
  }

function createMarkup({webformatURL,
     largeImageURL,
     tags, 
     likes, 
     views, 
     comments, 
     downloads }){
return `
<div class = "photo-card">
    <a href="${largeImageURL}"> 
      <img
      src="${webformatURL}"
      alt="${tags}" 
      loading="lazy"
      />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}</p>
      <p class="info-item">
        <b>Views</b>${views}</p>
      <p class="info-item">
        <b>Comments</b>${comments}</p>
      <p class="info-item">
        <b>Downloads</b>${downloads}</p>
    </div>
  </div>`;
}


function onError(err) {
    console.error(err);
    updateGallery("<p>Pictures not found</p>");
  }

Notiflix.Notify.init({
    width: '400px',
    position: 'center-center',
    fontSize: '24px',
    cssAnimationDuration: 300,
    borderRadius: '10px',
  });







