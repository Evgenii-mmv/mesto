import './index.css'
import Section from '../components/Section';
import {
  cardsSelector, buttonAdd,
  buttonEdit,
  validationConfig,
} from '../constants/index.js';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator';
import Api from '../components/Api';
import PopupWithConfirm from '../components/PopupWithConfirm'

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '52388433-afce-471a-9922-beec3eda8533',
    'Content-Type': 'application/json'
  },
});

api.getUser().then(userData => {
  api.getCards().then(cardsData => {
    const popupWithImage = new PopupWithImage('.pop-up_theme_image');
    popupWithImage.setEventListeners();
    const popupWithConfirm = new PopupWithConfirm('.pop-up-warning', (cardId) => api.deleteCard(cardId));
    popupWithConfirm.setEventListeners();

    const sectionCard = new Section(
      {
        items: cardsData,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          sectionCard.addItem(cardElement);
        }
      },
      cardsSelector
    );
    sectionCard.renderItems();

    const popupAdd = new PopupWithForm('.pop-up_theme_add', (formData) => {
      return api.createCard(formData.placeName, formData.image).then(cardData => {
        const cardElement = createCard(cardData);
        sectionCard.prerendItem(cardElement);
      }).catch(e => console.error(e));
    }, (inputForm) => {
        return new FormValidator(validationConfig, inputForm);
    });
    popupAdd.setEventListeners();

    const userInfo = new UserInfo({
      selectorName: '.profile__title',
      selectorSelfInfo: '.profile__subtitle',
      selectorAvatar: '.profile__avatar'
    });
    userInfo.setUserInfo({name: userData.name, info: userData.about});
    userInfo.setNewAvatar(userData.avatar);

    const popupAvatar = new PopupWithForm('.pop-up_theme_avatar', (formData) => {
      return api.setNewAvatar(formData.link).then(newAvatar =>{
         userInfo.setNewAvatar(newAvatar.avatar);
      }).catch(e => console.error(e));
    }, (inputForm) => {
        return new FormValidator(validationConfig, inputForm);
    });
    popupAvatar.setEventListeners();

    const popupEdit = new PopupWithForm('.pop-up_theme_edit', (inputObject) => {
      return api.updateUser(inputObject.nameInput, inputObject.jobInput).then(userInfoUpdated => {
        userInfo.setUserInfo({ name: userInfoUpdated.name, info: userInfoUpdated.about });
      }).catch(e => console.error(e));
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
    document.querySelector('.profile__avatar-edit').addEventListener('click', () => {
      popupAvatar.open({ link: userData.avatar });
    })

    function createCard(cardData) {
      const newCard = new Card({
        cardData,
        userData,
        templateSelector: '.template',

        handleCardClick: (link, name) => {
          popupWithImage.open(link, name);
        },
        handleDeleteClick: (cardId, onDeleteCallback) => {
          popupWithConfirm.open(cardId, onDeleteCallback);
        },
        handleLikeClick: (isUserLiked, cardId) => {
          if (isUserLiked) {
            return api.deleteLike(cardId).then((cardData) => {
              return {
                isLike: false,
                likeCount: cardData.likes.length
              }
            }).catch((e) => {
              console.error(e);
            });
          } else {
            return api.putLike(cardId).then((likesData) => {
              return {
                isLike: true,
                likeCount: likesData.likes.length
              }
            }).catch((e) => {
              console.error(e);
            });
          }
        }
      });
      return newCard.generateCard();
    }
  });

});
