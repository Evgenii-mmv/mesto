import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  _openData;

  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    document.querySelector('.pop-up-warning__save-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._openData.id).then(() => {
        this._openData.onDeleteCallback();
        super.close();
      }).catch(e => console.log(e));
    });
  }

  open(cardId, onDeleteCallback) {
    this._openData = {
      id: cardId,
      onDeleteCallback: onDeleteCallback
    }
    super.open();
  }
}