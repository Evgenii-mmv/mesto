export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._buttonSubmitSelector = config.buttonSubmitSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitbutton = this._formElement.querySelector(this._buttonSubmitSelector);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._formElement.addEventListener('reset', () => {
      this._setInactiveButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });
    this._setEventListeners();
  }

  checkButtonState() {
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._submitbutton);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _hideInputError(inputElement) {
    const error = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  _showInputError(inputElement) {
    const error = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = inputElement.validationMessage;
  }

  _hasInvalidInput() {
    return (this._inputList.some((inputElement) => !inputElement.validity.valid));
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._setInactiveButtonState();
    } else {
      this._submitbutton.classList.remove(this._inactiveButtonClass);
      this._submitbutton.disabled = false;
    }
  }
  _setInactiveButtonState() {
    this._submitbutton.classList.add(this._inactiveButtonClass);
    this._submitbutton.disabled = true;
  }
}