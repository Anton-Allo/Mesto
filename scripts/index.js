//*Variables*

const popups = document.querySelectorAll('.popup');
//-Popup close
const popupCloseButtonList = document.querySelectorAll('.popup__close');
//-Profile-
const profileInfoOccupation = document.querySelector('.profile__occupation');
const profileInfoName = document.querySelector('.profile__name');
const profileEditButton = document.querySelector('.profile__edit-button');
const imageAddButton = document.querySelector('.profile__add-button');
//-Popup edit form profile-
const popupEditProfileInfo = document.querySelector('.popup_edit-profile-info');
const popupInputFormName = document.querySelector('.popup__input-form-name');
const popupInputFormOccupation = document.querySelector('.popup__input-form-occupation');

//-Section cards-
const cardTemplate = document.querySelector('#cardTemplate').content;
const sectionCards = document.querySelector('.cards');

//-Popup view image-
const popupOpenImage = document.querySelector('.popup_open-image');
const popupViewImage = document.querySelector('.popup__view-image');
const popupTitleImage = document.querySelector('.popup__title-image');

//-Popup form input add image to card-
const popupAddButton = document.querySelector('.popup_add-button');
const popupInputFormLocation = document.querySelector('.popup__input-form-location');
const popupInputFormLink = document.querySelector('.popup__input-form-link');
const popupAddForm = document.querySelector('.popup__add-form');

//-Functions-
//-function open and close popup-
function openPopup(popup) {
  popup.classList.add('popup_opened');
  closePopupEventKeyEscape();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEventKeyEscape();
}

//-button popup close-
  popupCloseButtonList.forEach( function(item) {
  const popupClose = item.closest('.popup');
  item.addEventListener('click', function() {
    closePopup(popupClose);
  });
}); 

//-Close popup with keypress "Escape"- 
function eventKeyEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupEventKeyEscape() {
  document.addEventListener('keydown', eventKeyEscape);
}

function removeEventKeyEscape() {
  document.removeEventListener('keydown', eventKeyEscape);
}

//-Close windows to click overlay-
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
});

 //-functions edit form profile and popup profile-
 function openPopupFormProfile() {
  popupInputFormName.value = profileInfoName.textContent;
  popupInputFormOccupation.value = profileInfoOccupation.textContent;
  openPopup(popupEditProfileInfo);
  checkedOpenedPopup(popupEditProfileInfo);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileInfoName.textContent = popupInputFormName.value;
  profileInfoOccupation.textContent = popupInputFormOccupation.value;
  closePopup(popupEditProfileInfo);
}

//-functions popup and form add image, reset input -
function addPopupImage() {
  openPopup(popupAddButton);
  checkedOpenedPopup(popupAddButton);
}
 
function submitCardForm(evt) {
  evt.preventDefault();
  createCard({ name: popupInputFormLocation.value, link: popupInputFormLink.value });
  closePopup(popupAddButton);
  resetInputInfo();
}

function resetInputInfo() {
  popupAddForm.reset();
}

//-Function view image-
  function openPopupImage(clickViewImage) {
    popupViewImage.src = clickViewImage.src;
    popupViewImage.alt = clickViewImage.alt;
    popupTitleImage.textContent = clickViewImage.alt;
    openPopup(popupOpenImage);
  } 

//-Function render default and new cards-
function render () {
  initialCards.forEach(createCard);
}

function renderCard(item) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const clickViewImage = card.querySelector('.card__image');
  card.querySelector('.card__title').textContent = item.name;
  clickViewImage.src = item.link;
  clickViewImage.alt = item.name;
  
  //add button active Like:
  const likeActiveButton = card.querySelector('.card__like-button');
  function likeButtonClicked(evt) {
  evt.target.classList.toggle('card__like-button_active'); 
  }
  
  likeActiveButton.addEventListener('click', likeButtonClicked);

  //add button delete image:
  const trashButton = card.querySelector('.card__trash-button');
  function deleteImage(evt) {
  evt.target.closest('.card').remove();
  }
  
  trashButton.addEventListener('click', deleteImage);

  //-popup view image-
  clickViewImage.addEventListener('click', () => openPopupImage(clickViewImage));

  return card;
}

function createCard(item) {
  const card = renderCard(item);
  sectionCards.prepend(card);
}

//-add eventListener-
profileEditButton.addEventListener('click', openPopupFormProfile);
popupEditProfileInfo.addEventListener('submit', submitProfileForm);
imageAddButton.addEventListener('click', addPopupImage);
popupAddButton.addEventListener('submit', submitCardForm);

render ();