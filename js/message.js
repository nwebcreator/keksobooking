const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content;
  const successElement = successTemplate.querySelector('.success').cloneNode(true);

  document.body.appendChild(successElement);

  const removeSuccess = () => {
    successElement.remove();
    document.removeEventListener('keyup', escHandler);
  };

  function escHandler(evt) {
    if (evt.key === 'Escape') {
      removeSuccess();
    }
  }

  successElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeSuccess();
  });

  document.addEventListener('keyup', escHandler);
};

const showErrorMessage = (error) => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.querySelector('.error').cloneNode(true);
  if (error) {
    errorElement.querySelector('.error__message').textContent = error;
  }
  document.body.appendChild(errorElement);

  const removeSuccess = () => {
    errorElement.remove();
  };

  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeSuccess();
  });
};

export { showSuccessMessage, showErrorMessage };
