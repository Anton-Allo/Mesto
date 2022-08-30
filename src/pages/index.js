'use strict';

import './index.css';
import * as constants from '../utils/Constants.js';
import { Card } from '../components/Card.js';
import { variables } from '../utils/ConfigValidation.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

//*Variables*//
let userId;

const formAddCardValidator = new FormValidator(variables, constants.formAddCard);
const formEditProfileValidator = new FormValidator(variables, constants.popupFormEditProfile);
const formEditAvatarValidator = new FormValidator(variables, constants.editAvatarForm);


const section = new Section(addCard, '.cards');

const popupWithImage = new PopupWithImage(".popup_open-image");
const popupEditProfile = new PopupWithForm(".popup_edit-profile-info", handleProfileFormSubmit,  'Сохраняем...');
const popupAddImage = new PopupWithForm(".popup_add-button", handleCardFormSubmit, 'Добавляем карточку...');
const popupEditAvatar = new PopupWithForm('.popup_avatar-edit', handleEditAvatarFormSubmit, 'Меняем аватар...');
const popupDeleteCard = new PopupWithConfirmation(".popup_confirm-delete", 'Удаляем карточку...');

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileOccupationSelector: ".profile__occupation",
  profileAvatarSelector: ".profile__avatar"
});

//*Functions*//

function openPopupFormProfile() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formEditProfileValidator.clearErrorsForm();
  popupEditProfile.open();
}

function openAddPopup() {
  formAddCardValidator.clearErrorsForm();
  popupAddImage.open();
}

function openEditAvatarPopup() {
  formEditAvatarValidator.clearErrorsForm();
  popupEditAvatar.open();
}

function handleEditAvatarFormSubmit({ avatarUrl }) {
  return api.editAvatar(avatarUrl).then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
  });
}

function handleCardFormSubmit(data) {
  const createSubmit = true;
  return api.addCard(data.cardTitle, data.cardLink).then((res) => {
    addCard(res, createSubmit);
  });
}

function handleProfileFormSubmit({ name, about }) {
  return api.editUserInfo(name, about).then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
  });
}

function addCard(cardInfo, createSubmit) {
  section.setItem(createCard(cardInfo), createSubmit);
}

function createCard(cardInfo) {
  const card = new Card(cardInfo, constants.cardTemplate,() => {
      popupWithImage.open(cardInfo.name, cardInfo.link);
    },
    (id) => {
      popupDeleteCard.open();
      popupDeleteCard.changeSubmitHandler(() => {
        api
          .deleteCard(id)
          .then(() => {
            card.removeCard();
            popupDeleteCard.close();
        api
          .getCards()
          .then((cardList) => {
              addCard(cardList[cardList.length - 1], false);
              })
              .catch((err) => {
                err.then((res) => {
                  alert(res.message);
                });
              });
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message);
            });
          })
          .finally(() => {
            popupDeleteCard.renderLoading(true);
          });
      });
    },
    userId,
    (id) => {
      if (card.checkedLike()) {
        api
          .deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message);
            });
          });
      } else {
        api
          .addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message);
            });
          });
      }
    }
  );
  const cardItem = card.generateCard();
  return cardItem;
}

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    userId = userData._id;
    section.rendererItems(cards);
  })
  .catch((err) => {
    err.then((res) => {
      alert(res.message);
    });
  });


//* EventListeners*//

constants.profileAddButton.addEventListener('click', openAddPopup);
constants.profileEditButton.addEventListener('click', openPopupFormProfile);
constants.popupOpenAvatarEdit.addEventListener('click', openEditAvatarPopup);


//*Form enable validation*//

formAddCardValidator.enableValidation();
formEditProfileValidator.enableValidation();
formEditAvatarValidator.enableValidation();

popupWithImage.setEventListeners();
popupAddImage.setEventListeners();
popupEditProfile.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();
