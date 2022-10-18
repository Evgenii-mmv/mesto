import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popupElement.querySelector('.pop-up__image');
    this._popupCaption = this._popupElement.querySelector('.pop-up__cardtitle');
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
} 