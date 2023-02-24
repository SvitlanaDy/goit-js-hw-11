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
if (value === " "){Notiflix.Notify.error( 'This spot is empty.Pls enter smth')
return
}

const pictures = await getPictures(value);

if ( pictures.hits.length === 0 ) {Notiflix.Notify.error( "Sorry, there are no images matching your search query. Please try again.")
} else { createMarkup(pictures.hits);
  loadBtn.hidden = false; 
}}

function createMarkup(hits){
  const markup = hits.map(({webformatURL,
    largeImageURL,
    tags, 
    likes, 
    views, 
    comments, 
    downloads}) => {
  
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
})
.join();
gallery.innerHTML = markup;
}

function updateMarkup(hits){
  const markup = hits.map(({webformatURL,
    largeImageURL,
    tags, 
    likes, 
    views, 
    comments, 
    downloads}) => {
  
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
})
.join();
gallery.insertAdjacentHTML ('beforeend', markup);

}
async function onClick(){
  const value = form.elements.searchQuery.value.trim();
page += 1;
  const newPictures = await getPictures(value);
  updateMarkup(newPictures.hits);
}

// console.log(pictures);
// fetchApiService
// .getPicture(value)
// .then((hits) => {
//     if (hits.length === 0) throw new Error(
//         "Sorry, there are no images matching your search query. Please try again.");

//     return hits.reduce((markup, hits) => 
//     createMarkup(hits) + markup, "");
// })
// .then(updateGallery)
// .catch(onError)     //!!!!!!!!!!!!!!!!!!!!!!!
// .finally(() => form.reset());



   




// // function onError(err) {
// //     console.error(err);
// //     updateGallery(" Pictures not found ");
// //   }

// Notiflix.Notify.init({
//     width: '400px',
//     position: 'center-center',
//     fontSize: '24px',
//     cssAnimationDuration: 300,
//     borderRadius: '10px',
//   });






//   export default class fetchApi{
//     constructor(){
//         this.page = 1;
//     }
//    
// }
