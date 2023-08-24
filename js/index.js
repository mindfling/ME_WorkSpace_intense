// поключаем скрипт для работы с селектом
console.log('hallo')

const citySelect = document.querySelector('#city');
const cityChoices = new Choices(citySelect, {
  searchEnabled: false,
  itemSelectText: "",
});
