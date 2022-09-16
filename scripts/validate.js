//объект с переменными для валидации
const validationConfig = {
  inputSelector: '.pop-up__input',
  formSelector: '.pop-up__form',
  inputErrorClass: 'pop-up__input_type_error',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__disabled-button',
  errorClass: 'error_visible'
}
// Функция поиска форм
function enableValidation(config) {
  //массив форм
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    formElement.addEventListener('reset', (event) => {
      const buttonsub = formElement.querySelector(config.submitButtonSelector);
      setInactiveButtonState(buttonsub, config);
    });
    setEventListeners(formElement, config);
  });
}
//запускаем проверку инпутов формы на валидность
function setEventListeners(formElement, config) {
  //массив из инпутов формы
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitbutton = formElement.querySelector(config.submitButtonSelector);
  //Даем кнопки неактивное состояние в начале открытия pop-up
  toggleButtonState(inputList, submitbutton, config);
  //проверка инпутов на валидность, чтобы задать необходимый класс кнопке
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, submitbutton, config);
    });
  });
}
//проверка форм на валидность
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
}
//проверки инпута на валидность
function hasInvalidInput(inputList) {
  return (inputList.some((inputElement) => !inputElement.validity.valid));
}
//добавления класса с ошибкой
function showInputError(formElement, inputElement, errorMessage, config) {
  const error = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  error.classList.add(config.errorClass);
  error.textContent = errorMessage;
}
//удаления класса с ошибкой
function hideInputError(formElement, inputElement, config) {
  const error = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
}
//изменения класса у кнопки
function toggleButtonState(inputList, submitbutton, config) {
  if (hasInvalidInput(inputList)) {
    setInactiveButtonState(submitbutton, config);
  } else {
    setActiveButtonState(submitbutton, config);
  }
}
//делаем кнопку неактивной
function setInactiveButtonState(submitbutton, config) {
  submitbutton.classList.add(config.inactiveButtonClass);
  submitbutton.setAttribute('disabled', true);
}
//делаем кнопку активной
function setActiveButtonState(submitbutton, config) {
  submitbutton.classList.remove(config.inactiveButtonClass);
  submitbutton.removeAttribute('disabled', false);
}

enableValidation(validationConfig);