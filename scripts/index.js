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
const containerCardTemplate = document.querySelector('.card');
const cardImage = document.querySelector('.card__image');
const cardTitle = document.querySelector('.card_title');
const cardLikeButton = document.querySelector('.card__like-button');
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










//Здесь подключаются все слушатели на кнопки:
profileEditButton.addEventListener('click', openPopupEditButton); 
popupEditCloseButton.addEventListener('click', closePopupEditButton);
popupForm.addEventListener('submit', getFormProfileValue);
imageAddButton.addEventListener('click', openPopupAddButton);
popupAddCloseButton.addEventListener('click', closePopupAddButton);