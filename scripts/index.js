//-Array photo cards-
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//*Variables*

//-Popup close
const popupCloseButton = document.querySelectorAll('.popup__close');
//-Profile-
const profileInfoOccupation = document.querySelector('.profile__occupation');
const profileInfoName = document.querySelector('.profile__name');
const profileEditButton = document.querySelector('.profile__edit-button');
const imageAddButton = document.querySelector('.profile__add-button');
//-Edit form profile-
const popupEditProfileInfo = document.querySelector('.popup__edit-profile-info');
const popupInputFormName = document.querySelector('.popup__input-form-name');
const popupInputFormOccupation = document.querySelector('.popup__input-form-occupation');

//-Section cards-
const cardTemplate = document.querySelector('#cardTemplate').content;
const sectionCards = document.querySelector('.cards');

//-Popup view image-
const popupOpenImage = document.querySelector('.popup__open-image');
const popupViewImage = document.querySelector('.popup__view-image');
const popupTitleImage = document.querySelector('.popup__title-image');

//-Form input add image to card-
const popupAddButton = document.querySelector('.popup__add-button');
const popupInputFormLocation = document.querySelector('.popup__input-form-location');
const popupInputFormLink = document.querySelector('.popup__input-form-link');

//-Functions-
//-function open and close popup-
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//-button popup close-
  popupCloseButton.forEach( function(item) {
  const popupClose = item.closest('.popup');
  item.addEventListener('click', function() {
    closePopup(popupClose);
  });
}); 

 //-functions edit form profile and popup profile-
 function popupOpenFormProfile() {
  popupInputFormName.value = profileInfoName.textContent;
  popupInputFormOccupation.value = profileInfoOccupation.textContent;
  openPopup(popupEditProfileInfo);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileInfoName.textContent = popupInputFormName.value;
  profileInfoOccupation.textContent = popupInputFormOccupation.value;
  closePopup(popupEditProfileInfo);
}

//-functions popup and form add image, reset input -
function popupAddImage() {
  openPopup(popupAddButton);
}
 
function submitCardForm(evt) {
  evt.preventDefault();
  renderCreateCard({ name: popupInputFormLocation.value, link: popupInputFormLink.value });
  closePopup(popupAddButton);
  resetInputInfo();
}

function resetInputInfo() {
  popupInputFormLocation.value = "";
  popupInputFormLink.value = "";
}

//-Function view image-
  function popupImage(clickViewImage) {
    popupViewImage.src = clickViewImage.src;
    popupViewImage.alt = clickViewImage.alt;
    popupTitleImage.textContent = clickViewImage.alt;
    openPopup(popupOpenImage);
  } 

//-Function render default and new cards-
function render () {
  initialCards.forEach(renderCreateCard);
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
  function imageDelete(evt) {
  evt.target.closest('.card').remove();
  }
  
  trashButton.addEventListener('click', imageDelete);

  //-popup view image-
  clickViewImage.addEventListener('click', () => popupImage(clickViewImage));

  return card;
}

function renderCreateCard(item) {
  const card = renderCard(item);
  sectionCards.prepend(card);
}

//-add eventListener-
profileEditButton.addEventListener('click', popupOpenFormProfile);
popupEditProfileInfo.addEventListener('submit', submitProfileForm);
imageAddButton.addEventListener('click', popupAddImage);
popupAddButton.addEventListener('submit', submitCardForm);

render ();