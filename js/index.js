// server url consts
const API_URL = "https://workspace-methed.vercel.app";
const LOCATION_URL = "api/locations";
const VACANCY_URL = 'api/vacancy';

const cardsList = document.querySelector('.cards__list');
console.log('cardsList: ', cardsList);


// * получение данных
const getData = async (url, cbSuccess, cbError) => {
  try {
    console.log('url: ', url);
    // получаем данные с сервера    
    const response = await fetch(url);
    const data = await response.json();
    // все остальное обрабатываем через колбеки
    cbSuccess(data); // callback success case
    
  } catch (err) {
    cbError(err); // callback fail case
  }
}

const renderVacancy = (data) => {
  // очищаем
  cardsList.textContent = '';
  
  console.log('renderVacancy data: ', data.vacancies);
  // debug
  
  data.vacancies.map((item) => {
    console.warn('vacancy item:');
    const html = `
  <li class="cards__item">
    <article class="vacancy" tabindex="0">
      <img class="vacancy__img" src="${API_URL}/${item.logo}" alt="Логотип компании ${item.company}" title="Логотип компании ${item.company}" />
      <p class="vacancy__company">${item.company}</p>
      <h3 class="vacancy__title">${item.title}</h3>
      <ul class="vacancy__fields">
        <li class="vacancy__field">Зарплата от <strong>${item.salary} ₽</strong></li>
        <li class="vacancy__field">Занятость ${item.type}</li>
        <li class="vacancy__field">Формат работы ${item.format}</li>
        <li class="vacancy__field">Опыт ${item.experience}</li>
        <li class="vacancy__field">Город ${item.location}</li>
        <li class="vacancy__field"><em>${item.description.substr(0, 70)}...</em></li>
        <li class="vacancy__field"><pre>${item.email}</pre></li>
      </ul>
    </article>
  </li>    
    `;
    cardsList.insertAdjacentHTML("beforeend", html);
  })
  

  
}

const renderError = (err) => {
  // todo 404 message
  cardsList.textContent = `Извините ;( Временные проблемы с подключением...`;
  console.warn('render vacancy error ' + err);
}

// * init main func
const init = () => {
  // поключаем скрипт для работы с селектом select city
  const citySelect = document.querySelector('#city');
  const cityChoices = new Choices(citySelect, {
    itemSelectText: "выберите город",
    searchEnabled: false, // отключ поиск для успешной очистки :-p
  });
  
  // получение данных по API
  getData(
    `${API_URL}/${LOCATION_URL}`,
    (locationData) => {
      // переберем массив
      const locations = locationData.map((location) => ({
        "value": location,
      }));
      // добавляется по алфавиту в список селект
      cityChoices.setChoices(
        locations,
        "value",
        "label",
        false, // true заменяет старые значения
      );
    },
    (err) => {
      console.error('error fetch getData failed', err);
    },
  );

  // cards render
  const url = new URL(`${API_URL}/${VACANCY_URL}`);
  
  getData(url, renderVacancy, renderError);
}

init();
