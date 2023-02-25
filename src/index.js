import Notiflix from 'notiflix';
import axios from 'axios';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more')

async function getPictures(query){
  const API = `33867943-5c281079387beab43eaa259d6`;
  const BASE_URL = `https://pixabay.com/api/?key=${API}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  
  const responce = await axios.get(BASE_URL);
  console.log(responce);
  return responce.data;
}

let value = '';
let page = 1;

form.addEventListener('submit', onSubmit)
loadBtn.addEventListener('click', onClick)

async function onSubmit(e){
e.preventDefault();
page = 1;
const form = e.currentTarget;
const value = form.elements.searchQuery.value.trim();
if (value === ""){Notiflix.Notify.failure( 'This spot is empty.Pls enter smth')
return;
}

const pictures = await getPictures(value);


if ( pictures.hits.length === 0 ) {
  loadBtn.hidden = true;
  resetGallery();
  Notiflix.Notify.failure( "Sorry, there are no images matching your search query. Please try again.")
} else { createMarkup(pictures.hits);
  Notiflix.Notify.success(`Hooray! We found ${pictures.totalHits} images.`);
  loadBtn.hidden = false; 
  if (pictures.total === pictures.totalHits){
    loadBtn.hidden = true;
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
    }   
}
}

function resetGallery(){
  gallery.innerHTML = '';
}

function createMarkup(hits){
  const markup = hits
  .map(
    ({
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      largeImageURL,
    }) => {
      return `
      <div class="photo-card">
      <a class="gallery-item" href=${largeImageURL}>
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div> `;
    }
  )
  .join(``);
gallery.innerHTML = markup;
new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
}


function updateMarkup(hits){
  const markup = hits
  .map(
    ({
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      largeImageURL,
    }) => {
      return `
      <div class="photo-card">
      <a class="gallery-item" href=${largeImageURL}>
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div> `;
    }
  )
  .join(``);
gallery.insertAdjacentHTML ('beforeend', markup);
new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


}
async function onClick(){
  const value = form.elements.searchQuery.value.trim();
page += 1;
  const newPictures = await getPictures(value);
  updateMarkup(newPictures.hits);

  }







   












