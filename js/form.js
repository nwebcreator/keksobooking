import { HouseTypes } from './data.js';

const houseTypeSelector = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInSelector = document.querySelector('#timein');
const timeOutSelector = document.querySelector('#timeout');

const configPriceInput = (selectedHouseType) => {
  if(selectedHouseType === HouseTypes.BUNGALOW) {
    priceInput.min = 0;
    priceInput.placeholder = 0;
  } else if (selectedHouseType === HouseTypes.FLAT) {
    priceInput.min = 1000;
    priceInput.placeholder = 1000;
  } else if (selectedHouseType === HouseTypes.HOUSE) {
    priceInput.min = 5000;
    priceInput.placeholder = 5000;
  } else if (selectedHouseType === HouseTypes.PALACE) {
    priceInput.min = 10000;
    priceInput.placeholder = 10000;
  }
};

const setFormRules = () => {
  priceInput.max = 1000000;
  configPriceInput(houseTypeSelector.value);
  houseTypeSelector.addEventListener('change', (evt) => {
    evt.preventDefault();
    configPriceInput(evt.currentTarget.value);
  });

  timeInSelector.addEventListener('change', (evt) => {
    evt.preventDefault();
    timeOutSelector.value = evt.currentTarget.value;
  })

  timeOutSelector.addEventListener('change', (evt) => {
    evt.preventDefault();
    timeInSelector.value = evt.currentTarget.value;
  })
};

export {setFormRules};