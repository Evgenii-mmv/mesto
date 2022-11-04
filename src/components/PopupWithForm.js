import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popupSelector, callbackSubmit, getValidator) {
    super(popupSelector)
    this._callbackSubmit = callbackSubmit;
    this._inputForm = this._popupElement.querySelector('.pop-up__form');
    this._inpuList = Array.from(this._popupElement.querySelectorAll('.pop-up__input'));
    this._validator = getValidator(this._inputForm);
    this._buttonTitletype = this._popupElement.querySelector('.pop-up__save-button');
    this._buttonTitle = this._buttonTitletype.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inpuList.forEach(input => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._inputForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.setButtonTitle('Сохранение...');
      this._validator.enableValidation();
      this._callbackSubmit(this._getInputValues()).then(() => {
        this.close();
      }).finally(() => {
        this.setButtonTitle(this._buttonTitle);
      });
    });

    this._validator.enableValidation();
  }

  setButtonTitle(title) {
    this._buttonTitletype.textContent = title;
  }

  close() {
    super.close();
    setTimeout(() => this._inputForm.reset(), 500);
  }

  open(initialFormValues) {
    if (initialFormValues) {
      this._setInputValue(initialFormValues);
    }
    this._validator.checkButtonState();
    super.open();
  }

  _setInputValue(inputValues) {
    this._inpuList.forEach(input => {
      if (inputValues[input.name]) {
        input.value = inputValues[input.name];
      }
    });
  }
}
