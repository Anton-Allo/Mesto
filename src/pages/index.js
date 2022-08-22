'use strict';

import './index.css';
import * as constants from '../utils/Constants.js';
import { Card } from '../components/Card.js';
import { variables } from '../utils/ConfigValidation.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/InitialCards.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

//*Variables*//

const formAddCardValidator = new FormValidator(variables, constants.formAddCard);
const formEditProfileValidator = new FormValidator(variables, constants.popupFormEditProfile);
const section = new Section({data: initialCards, renderer: (item) => {
 const cardItem = createCard(item, '#cardTemplate');
  section.setItem(cardItem);
}}, '.cards');
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
  constants.popupInputFormName.value = name;
  constants.popupInputFormOccupation.value = occupation;
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
    name: data.name_location,
    link: data.link_image
  }));
  popupAddImage.close();
};

function renderCards(cardInfo) {
  section.setItem(createCard(cardInfo));
}

function createCard(cardInfo) {
 const card = new Card(cardInfo, constants.cardTemplate, () => {
    popupWithImage.open(cardInfo.name, cardInfo.link);
  });
  const cardItem = card.generateCard();
  return cardItem;
} 

//* EventListeners*//

constants.profileEditButton.addEventListener('click', openPopupFormProfile);
constants.profileAddButton.addEventListener('click', openAddPopup);

//*Form enable validation*//

formAddCardValidator.enableValidation();
formEditProfileValidator.enableValidation();

section.rendererItems(initialCards);

popupWithImage.setEventListeners();
popupAddImage.setEventListeners();
popupEditProfile.setEventListeners();