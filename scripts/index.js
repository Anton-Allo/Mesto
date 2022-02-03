let content = document.querySelector('.content')
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditButton = document.querySelector('.popup__edit-button');
const popupEditCloseButton = document.querySelector('.popup__edit-close-button');
const profileInfoName = document.querySelector('.profile__name');
const profileInfoOccupation = document.querySelector('.profile__occupation');
const popupForm = document.querySelector('.popup__form');
const popupFormInputName = popupForm.name_profile;
const popupFormInputOccupation = popupForm.occupation_profile;
 
// Функции для обработки popup кнопки редактирования профиля:
function openPopupEditButton() {
  popupEditButton.classList.add('popup_opened');
  popupFormInputName.value = profileInfoName.textContent;
  popupFormInputOccupation.value = profileInfoOccupation.textContent;
}

function closePopupEditButton() {
  popupEditButton.classList.remove('popup_opened');
}

function getFormProfileValue(event) {
  event.preventDefault();
  profileInfoName.textContent = popupFormInputName.value;
  profileInfoOccupation.textContent = popupFormInputOccupation.value;
  closePopupEditButton();
} //Завершение работы с кнопкой редактирования профиля.
//Начало работы с кнопкой добавления картинок:
const imageAddButton = document.querySelector('.profile__add-button');
const popupAddButton = document.querySelector('.popup__add-button');

const popupAddCloseButton = document.querySelector('.popup__add-close-button');

function openPopupAddButton() {
  popupAddButton.classList.add('popup_opened');
}

function closePopupAddButton() {
  popupAddButton.classList.remove('popup_opened');
} //Завершение работы с кнопкой добавления картинок:


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

//Добавляем карточки по-умолчанию:
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardImage = cardTemplate.querySelector('.card__image');
const cardTitle = cardTemplate.querySelector('.card_title');
const cardLikeButton = cardTemplate.querySelector('.card__like-button');
const sectionCards = document.querySelector('.cards');

function render () {
  initialCards.forEach(renderCreateCard);
}

function renderCreateCard (item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__image').alt = item.name;
  card.querySelector('.card__title').textContent = item.name;
  sectionCards.appendChild(card);
}

render ();

//popup for open image: 
const cardOpenImage = document.querySelector('.card__image');
const popupOpenImage = document.querySelector('.popup__open-image');
const popupCloseImage = document.querySelector('.popup__image-close-button');


function openPopupZoomImage(item) {
  popupOpenImage.classList.add('popup_opened');
}
function closePopupZoomImage() {
  popupOpenImage.classList.remove('popup_opened');
}

cardOpenImage.addEventListener('click', openPopupZoomImage);
popupCloseImage.addEventListener('click', closePopupZoomImage);


//add button active Like:
const likeActiveButton = document.querySelector('.card__like-button');
 function likeButtonClicked() {
  likeActiveButton.classList.toggle('card__like-button_active');
} 

//add button delete image:
const trashButton = document.querySelector('.card__trash-button');

function imageDelete() {
  const trashImage = trashButton.closest('.card');
  trashImage.remove();
}


//add button active like and add button delete image:
/* function addEventListener (item) {
  item.querySelector('.card__like-button').addEventListener('click', cardLike);
  item.querySelector('.card__trash-button').addEventListener('click', cardDelete);
}

function cardLike (event) {
  event.target.closest('.card__like-button').classList.toggle('card__like-button_active');
}

function cardDelete (event) {
  event.target.closest('.card').remove();
} */


//Здесь подключаются все слушатели на кнопки:
profileEditButton.addEventListener('click', openPopupEditButton); 
popupEditCloseButton.addEventListener('click', closePopupEditButton);
popupForm.addEventListener('submit', getFormProfileValue);
imageAddButton.addEventListener('click', openPopupAddButton);
popupAddCloseButton.addEventListener('click', closePopupAddButton);
trashButton.addEventListener('click', imageDelete);
likeActiveButton.addEventListener('click', likeButtonClicked);