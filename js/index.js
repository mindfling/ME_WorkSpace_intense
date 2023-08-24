const API_URL = "https://workspace-methed.vercel.app/";
const LOCATION_URL = "api/locations";





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


// * init main func
const init = () => {
  // поключаем скрипт для работы с селектом
  const citySelect = document.querySelector('#city');
  const cityChoices = new Choices(citySelect, {
    itemSelectText: "выберите город",
  });
  
  // получение данных по API
  getData(
    `${API_URL}${LOCATION_URL}`,
    (locationData) => {
      console.log('data reseived', locationData);
      
      // переберем массив
      const locations = locationData.map((location) => ({
        "value": location,
      }));
      
      console.log(locations)
      
      // добавляется по алфавиту в список селект
      cityChoices.setChoices(
        locations,
        "value",
        "label",
        false, // true заменяет старые значения
      );
      
    },
    (err) => {
      console.error('data failed', err);
    }
  );
  
}


init();