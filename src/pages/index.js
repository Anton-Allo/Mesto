'use strict';

import '../pages/index.css';
import * as Constants from '../utils/Constants.js';
import { Card } from '../components/Card.js';
import { variables } from '../utils/ConfigValidation.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/InitialCards.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

//*Variables*//

const formAddCardValidator = new FormValidator(variables, Constants.formAddCard);
const formEditProfileValidator = new FormValidator(variables, Constants.popupFormEditProfile);
const section = new Section(renderCards, '.cards');
const popupWithImage = new PopupWithImage('.popup_open-image');
const popupEditProfile = new PopupWithForm('.popup_edit-profile-info', handleProfileFormSubmit);
const popupAddImage = new PopupWithForm('.popup_add-button', handleCardFormSubmit);
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileOccupationtSelector: '.profile__occupation'
});

//*Functions*//

function openPopupFormProfile() {
  const { name, occupation } = userInfo.getUserInfo();
  Constants.popupInputFormName.value = name;
  Constants.popupInputFormOccupation.value = occupation;
  formEditProfileValidator.clearErrorsForm();
  popupEditProfile.open();
};

function openAddPopup() {
  formAddCardValidator.clearErrorsForm();
  popupAddImage.open();
};

function handleProfileFormSubmit(data) {
  const { userName, userOccupation } = data;
  userInfo.setUserInfo(userName, userOccupation);
  popupEditProfile.close();
};

function handleCardFormSubmit(data) {
  section.setItem(createCard({
    name: data.cardTitle,
    link: data.cardLink
  }));
  popupAddImage.close();
};

function renderCards(cardInfo) {
  section.setItem(createCard(cardInfo));
}

function createCard(cardInfo) {
  const card = new Card(cardInfo, Constants.cardTemplate, () => {
    popupWithImage.open(cardInfo.name, cardInfo.link);
  });
  const cardItem = card.generateCard();
  return cardItem;
}

//* EventListeners*//

Constants.profileEditButton.addEventListener('click', openPopupFormProfile);
Constants.profileAddButton.addEventListener('click', openAddPopup);

//*Form enable validation*//

formAddCardValidator.enableValidation();
formEditProfileValidator.enableValidation();

section.rendererItems(initialCards);

popupWithImage.setEventListeners();
popupAddImage.setEventListeners();
popupEditProfile.setEventListeners();