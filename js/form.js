import { HouseTypes } from './data.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const houseTypeSelector = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInSelector = document.querySelector('#timein');
const timeOutSelector = document.querySelector('#timeout');
const addressInput = document.querySelector('#address');
const titleInput = document.querySelector('#title');
const roomNumberSelector = document.querySelector('#room_number');
const capacitySelector = document.querySelector('#capacity');
const avatarInput = document.querySelector('#avatar');
const imagesInput = document.querySelector('#images');

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
  });

  timeOutSelector.addEventListener('change', (evt) => {
    evt.preventDefault();
    timeInSelector.value = evt.currentTarget.value;
  });

  addressInput.readOnly = true;

  capacitySelector.value = '1';
  roomNumberSelector.addEventListener('change', (evt) => {
    const rooms = evt.currentTarget.value;
    if (rooms === '1') {
      capacitySelector.value = '1';
      for (const option of capacitySelector.options) {
        option.disabled = option.value !== '1';
      }
    } else if (rooms === '2' ) {
      for (const option of capacitySelector.options) {
        option.disabled = option.value !== '1' && option.value !== '2';
      }

      if (capacitySelector.value !== '1' && capacitySelector.value !== '2') {
        capacitySelector.value = '2';
      }

    } else if (rooms === '3') {
      for (const option of capacitySelector.options) {
        option.disabled = option.value !== '1' && option.value !== '2' && option.value !== '3';
      }

      if (capacitySelector.value !== '1' && capacitySelector.value !== '2' && capacitySelector.value !== '3') {
        capacitySelector.value = '3';
      }

    } else if (rooms === '100') {
      capacitySelector.value = '0';
      for (const option of capacitySelector.options) {
        option.disabled = option.value !== '0';
      }
    } else {
      throw new Error('Количество комнат задано неверно');
    }
  })
};

const disableForms = () => {
  disableInteractiveElements('.ad-form', 'fieldset');
  disableInteractiveElements('.map__filters', 'fieldset, fieldset>input, select');
};

const disableInteractiveElements = (rootSelector, childrenSelector) => {
  const rootElement = document.querySelector(rootSelector);
  rootElement.classList.add('ad-form--disabled');
  const childrenElements = rootElement.querySelectorAll(childrenSelector);
  for (const child of childrenElements) {
    child.disabled = true;
  }
};

const enableForms = () => {
  enableInteractiveElements('.ad-form', 'fieldset');
  enableInteractiveElements('.map__filters', 'fieldset, fieldset>input, select');
};

const enableInteractiveElements = (rootSelector, childrenSelector) => {
  const rootElement = document.querySelector(rootSelector);
  rootElement.classList.remove('ad-form--disabled');
  const childrenElements = rootElement.querySelectorAll(childrenSelector);
  for (const child of childrenElements) {
    child.disabled = false;
  }
};

const setAddress = (x, y) => {
  addressInput.value = `${x.toFixed(5)}, ${y.toFixed(5)}`;
};

const setValidators = () => {

  titleInput.addEventListener('invalid', (evt) => {
    if (evt.currentTarget.validity.customError) {
      return;
    }

    if (evt.currentTarget.validity.valueMissing) {
      evt.currentTarget.setCustomValidity('Обязательное текстовое поле');
    } else {
      evt.currentTarget.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', (evt) => {
    const valueLength = evt.currentTarget.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      evt.currentTarget.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      evt.currentTarget.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
    } else {
      evt.currentTarget.setCustomValidity('');
    }

    evt.currentTarget.reportValidity();
  });

  priceInput.addEventListener('invalid', (evt) => {
    if (evt.currentTarget.validity.customError) {
      return;
    }

    if (evt.currentTarget.validity.valueMissing) {
      evt.currentTarget.setCustomValidity('Обязательное поле');
    } else {
      evt.currentTarget.setCustomValidity('');
    }
  });

  priceInput.addEventListener('keypress', (evt) => {
    const value = parseInt(evt.key);
    if(isNaN(value)) {
      evt.preventDefault();
    }
  });

  priceInput.addEventListener('input', (evt) => {
    const value = parseInt(evt.currentTarget.value);
    if(isNaN(value)) {
      evt.currentTarget.setCustomValidity('Цена должна быть числом.');
    } else {
      evt.currentTarget.setCustomValidity('');
    }

    evt.currentTarget.reportValidity();
  });

  const imageInputValidator = (evt) => {
    const fileName = evt.currentTarget.value.toLowerCase();
    if(!fileName.endsWith('.png') && !fileName.endsWith('.jpg')) {
      alert('Please upload .png or .jpg file only.');
      return false;
    }
  };

  avatarInput.addEventListener('change', imageInputValidator);
  imagesInput.addEventListener('change', imageInputValidator);
};


export {setFormRules, disableForms, enableForms, setAddress, setValidators};