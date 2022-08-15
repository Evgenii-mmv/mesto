const popup = document.querySelector('.pop-up');
const popupForm = popup.querySelector('.pop-up__form');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = popupForm.querySelector('.pop-up__input_type_name');
const jobInput = popupForm.querySelector('.pop-up__input_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const closeButton = popup.querySelector('.pop-up__close-button');

function openPopup() {
  FormValue();
  popup.classList.add('pop-up_opened');
}

function closePopup() {
  popup.classList.remove('pop-up_opened');
}

function FormValue() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileJob.textContent);
}

function formSubmitHand(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHand);