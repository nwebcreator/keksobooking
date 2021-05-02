'use strict';

const TOTAL_ADS = 10;
const TYPES = ['place', 'flat', 'house', 'bungalow'];
const CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const TITLES = ['Лучшее предложение', 'Выгодное предложение', 'Лучшее предложение месяца', 'Лучшее предложение недели'];
const MIN_PRICE = 200;
const MAX_PRICE = 1000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 6;
const MIN_GUESTS = 1;
const MAX_GUESTS = 12;

const getRandomInteger = (min, max) => {
  if (min < 0) {
    throw new Error('Value min cannot be less than zero');
  }
  if (max < 0) {
    throw new Error('Value max cannot be less than zero');
  }
  if (max <= min) {
    throw new Error('Value max cannot be less or equal than min');
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max, fractionDigits) => {
  if (min < 0) {
    throw new Error('Value min cannot be less than zero');
  }
  if (max < 0) {
    throw new Error('Value max cannot be less than zero');
  }
  if (max <= min) {
    throw new Error('Value max cannot be less or equal than min');
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(fractionDigits));
};

const getRandomElementFromArray = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomUniqueElementsFromArray = (elements) => {
  const totalCount = getRandomInteger(0, elements.length - 1);
  const shuffled = elements.slice(0).sort(() => {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, totalCount);
};

const generateLocation = () => {
  const x = getRandomFloat(35.65, 35.7, 5);
  const y = getRandomFloat(139.7, 139.8, 5);
  // x: x, y: y
  return { x, y };
};

const generateAuthor = () => {
  const num = getRandomInteger(1, 8);
  const avatar = `img/avatars/user0${num}.png`;
  return { avatar };
};

const generateOffer = (location) => {
  const title = getRandomElementFromArray(TITLES);
  const address = `${location.x}, ${location.y}`;
  const price = getRandomInteger(MIN_PRICE, MAX_PRICE);
  const type = getRandomElementFromArray(TYPES);
  const rooms = getRandomInteger(MIN_ROOMS, MAX_ROOMS);
  const guests = getRandomInteger(MIN_GUESTS, MAX_GUESTS);
  const checkin = getRandomElementFromArray(CHECK_IN_OUT_TIME);
  const checkout = getRandomElementFromArray(CHECK_IN_OUT_TIME);
  const features = getRandomUniqueElementsFromArray(FEATURES);
  const description = 'Сдается';
  const photos = getRandomUniqueElementsFromArray(PHOTOS);
  return { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos};
};

const generateAd = () => {
  const author = generateAuthor();
  const location = generateLocation();
  const offer = generateOffer(location);
  return { author, offer, location };
};

const generateAds = (count) => {
  const ads = [];
  for (let i = 0; i < count; i++) {
    ads.push(generateAd());
  }
  return ads;
};

const ads = generateAds(TOTAL_ADS);
// eslint-disable-next-line no-console
console.log(ads);
