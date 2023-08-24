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
      // добавляется по алфавиту в список селект
      cityChoices.setChoices(
        [
          {value: 'Калининград'},
          {value: 'Кёнигсберг'},
          {value: 'Королевецъ'},
        ],
        "value",
        "label",
        false,
      );
      
    },
    (err) => {
      console.error('data failed', err);
    }
  );
  
}


init();