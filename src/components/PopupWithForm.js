import { validationConfig } from '../constants/index.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popupSelector, callbackSubmit) {
    super(popupSelector)
    this._callbackSubmit = callbackSubmit;
    this._inputForm = this._popupElement.querySelector('.pop-up__form');
    this._inpuList = Array.from(this._popupElement.querySelectorAll('.pop-up__input'));
    this._validator = new FormValidator(validationConfig, this._inputForm);
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
      this._callbackSubmit(this._getInputValues());
      this.close();
    });

    this._validator.enableValidation();
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
