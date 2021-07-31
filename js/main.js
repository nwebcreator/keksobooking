import { generateAdMarkup } from './generate-markup.js';
import { setFormRules, disableForms, enableForms, setAddress, setValidators, setFormSubmitHandler, MAIN_LAT, MAIN_LNG, resetForm } from './form.js';
import { getAds, saveAd } from './server-api.js';
import { showSuccessMessage,showErrorMessage } from './message.js';

setFormRules();
setValidators();
disableForms();
setFormSubmitHandler((ad) => {
  // console.log(ad);
  saveAd(ad)
    .then((result) => {
      //success message
      if(result)
      {
        resetForm();
        showSuccessMessage();
      }
      //fail message
      else {
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
      //alert('unknown error');
    });
});

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
    setAddress(MAIN_LAT, MAIN_LNG);
  })
  .setView({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: MAIN_LAT,
  lng: MAIN_LNG,
}, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  setAddress(latLng.lat, latLng.lng);
});

getAds()
  .then((ads) => {
    ads.forEach((ad) => {
      const lat = ad.location.lat;
      const lng = ad.location.lng;
      const icon = L.icon({
        iconUrl: '/img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker({
        lat,
        lng,
      }, {
        icon,
      });

      marker.addTo(map).bindPopup(generateAdMarkup(ad));
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    // eslint-disable-next-line no-alert
    alert('Не смог загрузить данные с сервера');
  });
