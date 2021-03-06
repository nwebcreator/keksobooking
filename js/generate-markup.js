import {HouseTypeDescriptions} from './data.js';

const generateAdMarkup = (ad) => {
  const offer = ad.offer;
  const author = ad.author;

  const cardTemplate = document.querySelector('#card').content;
  const popupElement = cardTemplate.querySelector('.popup').cloneNode(true);

  const popupTitle = popupElement.querySelector('.popup__title');
  popupTitle.textContent = offer.title;

  const popupAddress = popupElement.querySelector('.popup__text--address');
  popupAddress.textContent = offer.address;

  const popupPrice = popupElement.querySelector('.popup__text--price');
  popupPrice.textContent = `${offer.price} ₽/ночь`;

  const popupType = popupElement.querySelector('.popup__type');
  popupType.textContent = HouseTypeDescriptions[offer.type];

  const popupCapacity = popupElement.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  const popupTime = popupElement.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if(offer.features) {
    const popupFeatures =  popupElement.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    for(let i = 0; i < offer.features.length; i++) {
      const featureLi = document.createElement('li');
      featureLi.classList.add('popup__feature');
      featureLi.classList.add(`popup__feature--${offer.features[i]}`);
      popupFeatures.appendChild(featureLi);
    }
  }

  const popupDescription = popupElement.querySelector('.popup__description');
  popupDescription.textContent = offer.description;

  const popupPhotos = popupElement.querySelector('.popup__photos');
  if(offer.photos) {
    popupPhotos.innerHTML = '';
    for(let i = 0; i < offer.photos.length; i++) {
      const photoImg = document.createElement('img');
      photoImg.classList.add('popup__photo');
      photoImg.width = 45;
      photoImg.height = 40;
      photoImg.alt = 'Фотография жилья';
      photoImg.src = offer.photos[i];
      popupPhotos.appendChild(photoImg);
    }
  } else {
    popupPhotos.remove();
  }


  const popupAvatar = popupElement.querySelector('.popup__avatar');

  if(author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  return popupElement;
};

export {generateAdMarkup};
