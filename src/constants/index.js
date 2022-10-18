export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const validationConfig = {
  inputSelector: '.pop-up__input',
  formSelector: '.pop-up__form',
  inputErrorClass: 'pop-up__input_type_error',
  buttonSubmitSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__disabled-button',
  errorClass: 'error_visible'
}
export const selectors = {
  profileTitle: '.profile__title',
  cardTemplate: '.card',
}

export const cardsSelector = '.cards';

export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonEdit = document.querySelector('.profile__edit-button');