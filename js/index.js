const API_URL = "https://workspace-methed.vercel.app/";
const LOCATION_URL = "api/locations";

console.log('hallo')

// поключаем скрипт для работы с селектом
const citySelect = document.querySelector('#city');
const cityChoices = new Choices(citySelect, {
  searchEnabled: true,
  itemSelectText: "",
});


// * получение данных по API
fetch(API_URL + LOCATION_URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
  
  