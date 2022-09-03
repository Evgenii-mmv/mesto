//pop-up
const addPopup = document.querySelector('.pop-up_theme_add');
const editPopup = document.querySelector('.pop-up_theme_edit');
const imagePopup = document.querySelector('.pop-up_theme_image');
// Закрытие pop-up
const editPopupCloseButton = editPopup.querySelector('.pop-up__close-button');
const addPopupCloseButton = addPopup.querySelector('.pop-up__close-button');
const imagePopupCloseButton = imagePopup.querySelector('.pop-up__close-button');
//Открытие pop-up
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
//Отправка форм pop-up  / сохранение изменений в pop-up
const popupEditForm = editPopup.querySelector('.pop-up__form_type_edit');
const popupAddForm = addPopup.querySelector('.pop-up__form_type_add');
//Инпуты
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const placeName = popupAddForm.querySelector('.pop-up__input_title');
const imageSource = popupAddForm.querySelector('.pop-up__input_image');
const nameInput = editPopup.querySelector('.pop-up__input_type_name');
const jobInput = editPopup.querySelector('.pop-up__input_type_job');
//Карточки
const cardsElement = document.querySelector('.cards');
const templateElement = document.querySelector('.template');
//pop-up изображения
const popupImage = imagePopup.querySelector('.pop-up__image');
const popupCaption = imagePopup.querySelector('.pop-up__cardtitle');
//Универальная функция открытия pop-up
function openPopup(popup) {
  popup.classList.add('pop-up_opened');
}
//функция открытия add pop-up
function clickAddHandler() {
  openPopup(addPopup);
}
//функция открытия edit pop-up
function clickEditHandler() {
  FormValue();
  openPopup(editPopup);
}
//функция открытия image pop-up
function clickCardImageHandler(evt, link, name) {
  openPopup(imagePopup);
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}
//Универсальная функция закрытия pop-up
function closePopup(popup) {
  popup.classList.remove('pop-up_opened');
}
//закрытие pop-up edit
function closeEditPopup() {
  closePopup(editPopup);
}
//закрытие pop-up add
function closeAddPopup() {
  closePopup(addPopup);
}
//закрытие pop-up image
function closeImagePopup() {
  closePopup(imagePopup);
}
//Функция инпутов для редактирования 
function FormValue() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileJob.textContent);
}
//функция сохранения инпутов pop-up edit
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditPopup();
}
//функция сохранения инпутов pop-up add
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const title = placeName.value;
  const image = imageSource.value;
  const objectCard = {
    name: title,
    link: image
  }
  cardsElement.prepend(createCard(objectCard));
  closeAddPopup();
  popupAddForm.reset();
}
//создание карточек 
function createCard(card) {
  //Содержание карточек
  const newItemElement = templateElement.content.querySelector('.card').cloneNode(true);
  const cardImage = newItemElement.querySelector('.card__image');
  const deleteButton = newItemElement.querySelector('.card__delete-button');
  const likeButton = newItemElement.querySelector('.card__like-button');
  //Заполнение карточек
  newItemElement.querySelector('.card__image').src = card.link;
  newItemElement.querySelector('.card__image').alt = card.name;
  newItemElement.querySelector('.card__title').textContent = card.name;
  //Вызов функцкий, которые связанные с карточками. В самой функции карточек т.к обалсть видимости не позволяет вне ее сделать
  cardImage.addEventListener('click', evt => clickCardImageHandler(evt, card.link, card.name));
  likeButton.addEventListener('click', evt => likeHandler(evt, likeButton));
  deleteButton.addEventListener('click', deleteHandler);
  return newItemElement;
}
//добавления карточкек в дом
function addInitialCards() {
  initialCards.forEach(element => {
    cardsElement.prepend(createCard(element));
  });
}
//лайк карточке
function likeHandler(evt, likeButton) {
  likeButton.classList.toggle('card__like-button_active');
}
//удаление карточки
function deleteHandler(evt) {
  const element = evt.target.closest('.card');
  element.remove();
}
//Вызов функции для добавления карточек на страницу через js
addInitialCards();
//вызов функции открытия pop-up
addButton.addEventListener('click', clickAddHandler);
editButton.addEventListener('click', clickEditHandler);
//вызов функции закртия pop-up
editPopupCloseButton.addEventListener('click', closeEditPopup);
addPopupCloseButton.addEventListener('click', closeAddPopup);
imagePopupCloseButton.addEventListener('click', closeImagePopup);
//вызов функии отправки форм
popupEditForm.addEventListener('submit', editFormSubmitHandler);
popupAddForm.addEventListener('submit', addFormSubmitHandler);
