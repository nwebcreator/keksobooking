const filters = {
  housingType: 'any',
  housingPrice: 'any',
  housingRooms: 'any',
  housingGuests: 'any',
  housingFeatures: [],
};

const setHousingTypeFilterHandler = (cb) => {
  const housingTypeFilter = document.querySelector('#housing-type');
  housingTypeFilter.addEventListener('change', (evt) => {
    evt.preventDefault();
    filters.housingType = housingTypeFilter.value;
    cb();
  });
};

const setHousingPriceFilterHandler = (cb) => {
  const housingPriceFilter = document.querySelector('#housing-price');
  housingPriceFilter.addEventListener('change', (evt) => {
    evt.preventDefault();
    filters.housingPrice = housingPriceFilter.value;
    cb();
  });
};

const setHousingRoomsFilterHandler = (cb) => {
  const housingRoomsFilter = document.querySelector('#housing-rooms');
  housingRoomsFilter.addEventListener('change', (evt) => {
    evt.preventDefault();
    filters.housingRooms = housingRoomsFilter.value;
    cb();
  });
};

const setHousingGuestsFilterHandler = (cb) => {
  const housingGuestsFilter = document.querySelector('#housing-guests');
  housingGuestsFilter.addEventListener('change', (evt) => {
    evt.preventDefault();
    filters.housingGuests = housingGuestsFilter.value;
    cb();
  });
};

const setHousingFeaturesFilterHandler = (cb) => {
  const housingFeaturesilter = document.querySelector('#housing-features');
  housingFeaturesilter.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'INPUT') {
      const feature = evt.target.value;
      const checked = evt.target.checked;
      if (checked) {
        filters.housingFeatures.push(feature);
      } else {
        filters.housingFeatures = filters.housingFeatures.filter((it) => it !== feature);
      }
      cb();
    }
  });
};

const applyFilters = (ads) => {
  let filteredAds = ads.slice(0);
  if (filters.housingType !== 'any') {
    filteredAds = filteredAds.filter((ad) => ad.offer.type === filters.housingType);
  }

  if (filters.housingPrice !== 'any') {
    switch (filters.housingPrice) {
      case 'middle': {
        filteredAds = filteredAds.filter((ad) => ad.offer.price >= 10000 & ad.offer.price <= 50000);
        break;
      }
      case 'low': {
        filteredAds = filteredAds.filter((ad) => ad.offer.price < 10000);
        break;
      }
      case 'high': {
        filteredAds = filteredAds.filter((ad) => ad.offer.price > 50000);
        break;
      }
    }
  }

  if (filters.housingRooms !== 'any') {
    switch (filters.housingRooms) {
      case '1': {
        filteredAds = filteredAds.filter((ad) => ad.offer.rooms === 1);
        break;
      }
      case '2': {
        filteredAds = filteredAds.filter((ad) => ad.offer.rooms === 2);
        break;
      }
      case '3': {
        filteredAds = filteredAds.filter((ad) => ad.offer.rooms === 3);
        break;
      }
    }
  }

  if (filters.housingGuests !== 'any') {
    switch (filters.housingGuests) {
      case '2': {
        filteredAds = filteredAds.filter((ad) => ad.offer.guests === 2);
        break;
      }
      case '1': {
        filteredAds = filteredAds.filter((ad) => ad.offer.guests === 1);
        break;
      }
      case '0': {
        filteredAds = filteredAds.filter((ad) => ad.offer.guests === 0);
        break;
      }
    }
  }

  if (filters.housingFeatures.length > 0) {
    filteredAds = filteredAds.filter((ad) => ad.offer.features && ad.offer.features.filter((feature) => filters.housingFeatures.includes(feature)).length === filters.housingFeatures.length);
  }

  return filteredAds;
};

export { setHousingTypeFilterHandler, setHousingPriceFilterHandler, setHousingRoomsFilterHandler, setHousingGuestsFilterHandler, setHousingFeaturesFilterHandler, applyFilters };
