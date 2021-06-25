import { generateAds } from './data.js';
import { generateAdMarkup } from './generate-markup.js';
import { setFormRules, disableForms, enableForms, setAddress, setValidators } from './form.js';

const MAIN_LAT = 59.96831;
const MAIN_LNG = 30.31748;
const ads = generateAds();

setFormRules();
setValidators();
disableForms();

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
    setAddress(MAIN_LAT, MAIN_LNG);
  })
  .setView({
    lat: 59.92749,
    lng: 30.31127,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  setAddress(latLng.lat, latLng.lng);
});

ads.forEach((ad) => {
  const lat = ad.location.lat;
  const lng = ad.location.lng;
  const icon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker.addTo(map).bindPopup(generateAdMarkup(ad));
});