const TOTAL_ADS = 10;
const TYPES = ['place', 'flat', 'house', 'bungalow'];
const CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getRandomInteger(min, max) {
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
}

function getRandomFloat(min, max, fractionDigits) {
  if (min < 0) {
    throw new Error('Value min cannot be less than zero');
  }
  if (max < 0) {
    throw new Error('Value max cannot be less than zero');
  }
  if (max <= min) {
    throw new Error('Value max cannot be less or equal than min');
  }

  return (Math.random() * (max - min) + min).toFixed(fractionDigits);
}

function getRandomElementFromArray(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function getRandomUniqueElementsFromArray(elements) {
  const totalCount = getRandomInteger(0, elements.length - 1);
  const shuffled = elements.slice(0).sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, totalCount);
}

function generateLocation() {
  const x = getRandomFloat(35.65, 35.7, 5);
  const y = getRandomFloat(139.7, 139.8, 5);
  // x: x, y: y
  return { x, y };
}

function generateAuthor() {
  const num = getRandomInteger(1, 8);
  const avatar = `img/avatars/user0${num}.png`;
  return { avatar };
}

function generateOffer(location) {
  const title = 'Лучшее предложение';
  const address = `${location.x}, ${location.y}`;
  const price = getRandomInteger(200, 1000);
  const type = getRandomElementFromArray(TYPES);
  const rooms = getRandomInteger(1, 6);
  const guests = getRandomInteger(1, 12);
  const checkin = getRandomElementFromArray(CHECK_IN_OUT_TIME);
  const checkout = getRandomElementFromArray(CHECK_IN_OUT_TIME);
  const features = getRandomUniqueElementsFromArray(FEATURES);
  const description = 'Сдается';
  const photos = getRandomUniqueElementsFromArray(PHOTOS);
  return { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos};
}

function generateAd() {
  const author = generateAuthor();
  const location = generateLocation();
  const offer = generateOffer(location);
  return { author, offer, location };
}

function generateAds(count) {
  const ads = [];
  for (let i = 0; i < count; i++) {
    ads.push(generateAd());
  }
  return ads;
}

const ads = generateAds(TOTAL_ADS);
console.log(ads);