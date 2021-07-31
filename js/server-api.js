const getAds = () =>
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json());

const saveAd = (formData) =>
  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    contentType: 'multipart/form-data',
    body: formData,
  })
    .then((response) => response.ok === true);

export { getAds, saveAd };
