export default class Card {
  constructor(object, templateSelector, handleCardClick) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikePopup() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _handleImagePopup() {
    this._handleCardClick(this._link, this._name);
  }

  _handleDeletePopup() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeButton.addEventListener('click', () => {
      this._handleLikePopup();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeletePopup();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImagePopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    return this._element;

  }

}