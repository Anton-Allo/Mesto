import { initialCards } from './InitialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//-Variables-
const popups = document.querySelectorAll('.popup');

const variables = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-form',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-form_error',
  errorClass: 'popup__input-error_visible'
};

// -Profile-
const profileInfoName = document.querySelector('.profile__name');
const profileInfoOccupation = document.querySelector('.profile__occupation');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

// -Form edit profile-
const popupEditProfileInfo = document.querySelector('.popup_edit-profile-info');
const popupInputFormName = document.querySelector('.popup__input-form-name');
const popupInputFormOccupation = document.querySelector('.popup__input-form-occupation');
const popupFormEditProfile = popupEditProfileInfo.querySelector('.popup__form');

// -Form add image card-
const popupAddCard = document.querySelector('.popup_add-button');
const popupInputFormLocation = document.querySelector('.popup__input-form-location');
const popupInputFormLink = document.querySelector('.popup__input-form-link');
const formAddCard = popupAddCard.querySelector('.popup__form');

// -Section cards-
const cardTemplate = ('#cardTemplate');
const sectionCards = document.querySelector('.cards');

// -Popup view image-
const popupOpenImage = document.querySelector('.popup_open-image');
const popupTitleImage = popupOpenImage.querySelector('.popup__title-image');
const popupViewImage = popupOpenImage.querySelector('.popup__view-image');

const formAddCardValidator = new FormValidator(variables, formAddCard);
const formEditProfileValidator = new FormValidator(variables, popupFormEditProfile);

//-Functions-
// -Pop-up-
function openPopup(popup) {
  popup.classList.add('popup_opened');
  closePopupEventEscape();
}

export function openImagePopup(linkImage, nameImage) {
  popupViewImage.src = linkImage;
  popupViewImage.alt = nameImage;
  popupViewImage.textContent = nameImage;
  openPopup(popupOpenImage);
}

function openPopupFormProfile() {
  popupInputFormName.value = profileInfoName.textContent;
  popupInputFormOccupation.value = profileInfoOccupation.textContent;
  formEditProfileValidator.clearErrorsForm();
  openPopup(popupEditProfileInfo);
}

function openAddPopup() {
  formAddCard.reset();
  formAddCardValidator.clearErrorsForm();
  openPopup(popupAddCard);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCards({ name: popupInputFormLocation.value, link: popupInputFormLink.value });
  closePopup(popupAddCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileInfoName.textContent = popupInputFormName.value;
  profileInfoOccupation.textContent = popupInputFormOccupation.value;
  closePopup(popupEditProfileInfo);
}


function renderCards(cardInfo) {
  sectionCards.prepend(createCard(cardInfo));
}

function createCard(cardInfo) {
  const card = new Card(cardInfo, cardTemplate);
  const сardItem = card.generateCard();
  return сardItem;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEventEscape();
}

// -Event for escape-
function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

function closePopupEventEscape() {
  document.addEventListener('keydown', handleEscKey);
}

function removeEventEscape() {
  document.removeEventListener('keydown', handleEscKey);
}

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') | evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

// -Event from button-
profileEditButton.addEventListener('click', openPopupFormProfile);
profileAddButton.addEventListener('click', openAddPopup);

// -Save button-
popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(cardInfo => renderCards(cardInfo));

formEditProfileValidator.enableValidation();

formAddCardValidator.enableValidation();
