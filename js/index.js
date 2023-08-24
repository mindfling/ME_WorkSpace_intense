const API_URL = "https://workspace-methed.vercel.app/";
const LOCATION_URL = "api/locations";


// поключаем скрипт для работы с селектом
const citySelect = document.querySelector('#city');
const cityChoices = new Choices(citySelect, {
  searchEnabled: true,
  itemSelectText: "",
});


// * получение данных
const getData = async (url, cbSuccess, cbError) => {
  try {
    console.log('url: ', url);
    
    const response = await fetch(url);
    const data = await response.json();
    cbSuccess(data); // callback success case
    
  } catch (err) {
    cbError(err); // callback fail case
  }
}


// получение данных по API
getData(
  API_URL + LOCATION_URL,
  data => {
    console.log('data reseived', data);
    data.forEach((city, index) => {
      console.log(index, city);
    })
  },
  err => {
    console.error('data failed', err);
  }
);


/*
fetch(API_URL + LOCATION_URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
});
*/