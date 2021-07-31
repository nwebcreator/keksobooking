//import { getRandomInteger, getRandomFloat, getRandomElementFromArray, getRandomUniqueElementsFromArray } from './util.js';
// const TOTAL_ADS = 10;

const HouseTypes = {
  FLAT: 'flat',
  BUNGALOW: 'bungalow',
  HOUSE: 'house',
  PALACE: 'palace',
};

// const CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
// const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// const TITLES = ['Лучшее предложение', 'Выгодное предложение', 'Лучшее предложение месяца', 'Лучшее предложение недели'];
// const MIN_PRICE = 200;
// const MAX_PRICE = 1000;
// const MIN_ROOMS = 1;
// const MAX_ROOMS = 6;
// const MIN_GUESTS = 1;
// const MAX_GUESTS = 12;

const HouseTypeDescriptions = {
  [HouseTypes.FLAT]: 'Квартира',
  [HouseTypes.BUNGALOW]: 'Бунгало',
  [HouseTypes.HOUSE]: 'Дом',
  [HouseTypes.PALACE]: 'Дворец',
};

// const generateLocation = () => {
//   const lat = getRandomFloat(59.8, 59.99, 5);
//   const lng = getRandomFloat(30.2, 30.45, 5);
//   return { lat, lng };
// };

// const generateAuthor = () => {
//   const num = getRandomInteger(1, 8);
//   const avatar = `img/avatars/user0${num}.png`;
//   return { avatar };
// };

// const generateOffer = (location) => {
//   const title = getRandomElementFromArray(TITLES);
//   const address = `${location.lat}, ${location.lng}`;
//   const price = getRandomInteger(MIN_PRICE, MAX_PRICE);
//   const type = getRandomElementFromArray(Object.values(HouseTypes));
//   const rooms = getRandomInteger(MIN_ROOMS, MAX_ROOMS);
//   const guests = getRandomInteger(MIN_GUESTS, MAX_GUESTS);
//   const checkin = getRandomElementFromArray(CHECK_IN_OUT_TIME);
//   const checkout = getRandomElementFromArray(CHECK_IN_OUT_TIME);
//   const features = getRandomUniqueElementsFromArray(FEATURES);
//   const description = 'Сдается';
//   const photos = getRandomUniqueElementsFromArray(PHOTOS);
//   return { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos };
// };

// const generateAd = () => {
//   const author = generateAuthor();
//   const location = generateLocation();
//   const offer = generateOffer(location);
//   return { author, offer, location };
// };

// const generateAds = () => {
//   const ads = [];
//   for (let i = 0; i < TOTAL_ADS; i++) {
//     ads.push(generateAd());
//   }
//   return ads;
// };

export { /*generateAds, */HouseTypeDescriptions, HouseTypes };
