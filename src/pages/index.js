import './index.css'
import Section from '../components/Section';
import {
  initialCards, cardsSelector, buttonAdd,
  buttonEdit,
  validationConfig
} from '../constants/index.js';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator';

const popupWithImage = new PopupWithImage('.pop-up_theme_image');
popupWithImage.setEventListeners();

const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      sectionCard.addItem(cardElement);
    }
  },
  cardsSelector
);
sectionCard.renderItems();

function createCard(item) {
  const newCard = new Card(item, '.template', (link, name) => {
    popupWithImage.open(link, name);
  });
  return newCard.generateCard();
}


const popupAdd = new PopupWithForm('.pop-up_theme_add', (inputObject) => {
  const cardObj = {
    name: inputObject.placeName,
    link: inputObject.image
  }
  const cardElement = createCard(cardObj);
  sectionCard.prerendItem(cardElement);
}, (inputForm) => {
    return new FormValidator(validationConfig, inputForm);
});
popupAdd.setEventListeners();

const userInfo = new UserInfo({ selectorName: '.profile__title', selectorSelfInfo: '.profile__subtitle' });

const popupEdit = new PopupWithForm('.pop-up_theme_edit', (inputObject) => {
  userInfo.setUserInfo({ name: inputObject.nameInput, info: inputObject.jobInput });
}, (inputForm) => {
  return new FormValidator(validationConfig, inputForm);
});
popupEdit.setEventListeners();

buttonAdd.addEventListener('click', () => popupAdd.open());
buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupEdit.open({
    nameInput: userData.name,
    jobInput: userData.info
  });
});


