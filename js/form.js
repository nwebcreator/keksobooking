import { HouseTypes } from './data.js';

const MAIN_LAT = 35.59332;
const MAIN_LNG = 139.69810;

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adForm = document.querySelector('.ad-form');
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
//const descriptionInput = document.querySelector('#description');
const buttonReset = document.querySelector('.ad-form__reset');

const setFormSubmitHandler = (cb) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    cb(new FormData(adForm));

    // const allFeatures = adForm.querySelectorAll('input[name=features]');
    // const checkedFeatures = Array.from(allFeatures).filter((it) => it.checked);
    // const features = checkedFeatures.map((it) => it.value);

    // const ad = {
    //   avatar: undefined,
    //   title: titleInput.value,
    //   address: addressInput.value,
    //   type: houseTypeSelector.value,
    //   price: priceInput.value,
    //   timein: timeInSelector.value,
    //   timeout: timeOutSelector.value,
    //   rooms: roomNumberSelector.value,
    //   capacity: capacitySelector.value,
    //   features: features,
    //   description: descriptionInput.value,
    //   images: undefined,
    // };
    // cb(ad);
  });
};

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

const setAddress = (x, y) => {
  addressInput.value = `${x.toFixed(5)}, ${y.toFixed(5)}`;
};

const resetForm = () => {
  adForm.reset();
  setAddress(MAIN_LAT, MAIN_LNG);
  capacitySelector.value = '1';
  priceInput.placeholder = 1000;
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
      throw new Error('???????????????????? ???????????? ???????????? ??????????????');
    }
  });

  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};

const disableInteractiveElements = (rootSelector, childrenSelector) => {
  const rootElement = document.querySelector(rootSelector);
  rootElement.classList.add('ad-form--disabled');
  const childrenElements = rootElement.querySelectorAll(childrenSelector);
  for (const child of childrenElements) {
    child.disabled = true;
  }
};

const enableInteractiveElements = (rootSelector, childrenSelector) => {
  const rootElement = document.querySelector(rootSelector);
  rootElement.classList.remove('ad-form--disabled');
  const childrenElements = rootElement.querySelectorAll(childrenSelector);
  for (const child of childrenElements) {
    child.disabled = false;
  }
};

const disableForms = () => {
  disableInteractiveElements('.ad-form', 'fieldset');
  disableInteractiveElements('.map__filters', 'fieldset, fieldset>input, select');
};

const enableForms = () => {
  enableInteractiveElements('.ad-form', 'fieldset');
  enableInteractiveElements('.map__filters', 'fieldset, fieldset>input, select');
};

const setValidators = () => {

  titleInput.addEventListener('invalid', (evt) => {
    if (evt.currentTarget.validity.customError) {
      return;
    }

    if (evt.currentTarget.validity.valueMissing) {
      evt.currentTarget.setCustomValidity('???????????????????????? ?????????????????? ????????');
    } else {
      evt.currentTarget.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', (evt) => {
    const valueLength = evt.currentTarget.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      evt.currentTarget.setCustomValidity(`?????? ${MIN_TITLE_LENGTH - valueLength} ????????.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      evt.currentTarget.setCustomValidity(`?????????????? ???????????? ${valueLength - MAX_TITLE_LENGTH} ????????.`);
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
      evt.currentTarget.setCustomValidity('???????????????????????? ????????');
    } else {
      evt.currentTarget.setCustomValidity('');
    }
  });

  priceInput.addEventListener('keypress', (evt) => {
    const value = parseInt(evt.key, 10);
    if(isNaN(value)) {
      evt.preventDefault();
    }
  });

  priceInput.addEventListener('input', (evt) => {
    const value = parseInt(evt.currentTarget.value, 10);
    if(isNaN(value)) {
      evt.currentTarget.setCustomValidity('???????? ???????????? ???????? ????????????.');
    } else {
      evt.currentTarget.setCustomValidity('');
    }

    evt.currentTarget.reportValidity();
  });

  const imageInputValidator = (evt) => {
    const fileName = evt.currentTarget.value.toLowerCase();
    if(!fileName.endsWith('.png') && !fileName.endsWith('.jpg')) {
      // eslint-disable-next-line no-alert
      alert('Please upload .png or .jpg file only.');
      return false;
    }
  };

  avatarInput.addEventListener('change', imageInputValidator);
  imagesInput.addEventListener('change', imageInputValidator);
};

export { setFormRules, disableForms, enableForms, setAddress, setValidators, setFormSubmitHandler, MAIN_LAT, MAIN_LNG, resetForm };
