import './pages/index.css';
import Section from './components/Section';
import {
  initialCards, cardsSelector, buttonAdd,
  buttonEdit
} from './constants';
import Card from './components/Card';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';
import UserInfo from './components/UserInfo';

const popupWithImage = new PopupWithImage('.pop-up_theme_image');
popupWithImage.setEventListeners();

const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, '.template', (link, name) => {
        popupWithImage.open(link, name);
      });
      const cardElement = newCard.generateCard();
      sectionCard.addItem(cardElement);
    }
  },
  cardsSelector
);
sectionCard.renderItems();

const popupAdd = new PopupWithForm('.pop-up_theme_add', (inputObject) => {
  const cardObj = {
    name: inputObject.placeName,
    link: inputObject.image
  }
  const newCard = new Card(cardObj, '.template', (link, name) => {
    popupWithImage.open(link, name);
  });
  const cardElement = newCard.generateCard();
  sectionCard.addItem(cardElement);
});
popupAdd.setEventListeners();

const userInfo = new UserInfo({ selectorName: '.profile__title', selectorSelfInfo: '.profile__subtitle' });

const popupEdit = new PopupWithForm('.pop-up_theme_edit', (inputObject) => {
  userInfo.setUserInfo({ name: inputObject.nameInput, info: inputObject.jobInput });
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


