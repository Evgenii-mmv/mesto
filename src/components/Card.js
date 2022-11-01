export default class Card {
  _quantityLikeSelector = '.card__quantity-like'
  _deleteButtonSelector = '.card__delete-button'

  constructor({
    cardData,
    userData,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  }) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._isUserOwner = cardData.owner._id === userData._id;
    this._isUserLiked = cardData.likes.some((likeData) => likeData._id == userData._id );
    this._likeCount = cardData.likes.length;

    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;


  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleImagePopup() {
    this._handleCardClick(this._link, this._name);
  }

  _handleDeletePopup() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeClick(this._isUserLiked, this._id).then(({isLike, likeCount}) => {
        this._likeCount = likeCount;
        this._quantityLike.textContent = this._likeCount;
        this._isUserLiked = isLike;

        if (isLike) {
          this._likeButtonElement.classList.add('card__like-button_active');
        } else {
          this._likeButtonElement.classList.remove('card__like-button_active');
        }
      });
    });

    if (this._isUserOwner) {
      const deleteButton = this._element.querySelector('.card__delete-button');
      deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this._id, () => this._handleDeletePopup());
      });
    }

    const cardImageElement = this._element.querySelector('.card__image');
    cardImageElement.addEventListener('click', () => {
      this._handleImagePopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate(); // node html
    this._likeButtonElement = this._element.querySelector('.card__like-button');

    // likes
    this._quantityLike = this._element.querySelector(this._quantityLikeSelector);
    this._quantityLike.textContent = this._likeCount;

    if (this._isUserLiked) {
      this._likeButtonElement.classList.add('card__like-button_active')
    }

    // images
    const cardImageElement = this._element.querySelector('.card__image');
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;

    // title
    const cardTitleElement = this._element.querySelector('.card__title');
    cardTitleElement.textContent = this._name;

    const deleteButtonElement = this._element.querySelector(this._deleteButtonSelector);
    if (!this._isUserOwner) {
      this._element.removeChild(deleteButtonElement);
    }

    this._setEventListeners();
    return this._element;
  }

}