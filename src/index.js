import  Notify from 'notiflix';
import fetchApi from './sass/js/fetchApi';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
const CardContainer = document.querySelector('.js-card-container')

const searchForm = document.querySelector('.js-search-form');
const articlesContainer = document.querySelector('.js-container');
const options = {
    headers:{
        Authorization: '33867943-5c281079387beab43eaa259d6',
    },  
};
const API_KEY = '33867943-5c281079387beab43eaa259d6';
// const url = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent();
const url = 'https://pixabay.com/api/?key=33867943-5c281079387beab43eaa259d6&q=photo&image_type=photo&orientation=horizontal&safesearch=true&page1'
fetch('https://pixabay.com/api/?key=33867943-5c281079387beab43eaa259d6&q=photo&image_type=photo&orientation=horizontal&safesearch=true')