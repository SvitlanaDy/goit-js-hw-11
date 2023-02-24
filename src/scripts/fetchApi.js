import axios from 'axios';
const API_KEY = '33867943-5c281079387beab43eaa259d6';
const BASE_URL = 'https://pixabay.com/api/';

// const url = 'https://pixabay.com/api/?key=33867943-5c281079387beab43eaa259d6&image_type=photo&orientation=horizontal&safesearch=true';
// fetch(url)
// .then((response) => response.json())
// .then(({hits}) => console.log(hits));

function fetchData(query){
    const url = 'https://pixabay.com/api/?key=33867943-5c281079387beab43eaa259d6&image_type=photo?q=${query}';
    return fetch(url)
    .then ((response) => response.json());
}
export default fetchData;