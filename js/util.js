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

export { getRandomInteger, getRandomFloat, getRandomElementFromArray, getRandomUniqueElementsFromArray };