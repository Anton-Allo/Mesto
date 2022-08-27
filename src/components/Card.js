'use strict';

export class Card {
  constructor(cardInfo, cardTemplate, handleImageClick, handleDeleteClick, userId, handleLikeClick) {
    this._cardTemplate = cardTemplate;
    this._userId = userId;
    this._ownerId = cardInfo.owner._id;
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._id = cardInfo._id;
    this._likes = cardInfo.likes;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardItem;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__image');
    this._likeButton = this._card.querySelector('.card__like-button');
    this._trashButton = this._card.querySelector('.card__trash-button');
    this._counterLikeCard = this._card.querySelector('.card__counter-likes');
    this._card.querySelector('.card__title').textContent = this._name;
    this.setLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this._trashButton.style.display = 'none';
    };
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
    this._cardImage.addEventListener('click', () => this._handleImageClick());
    this._trashButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
  }

   pushLike() {
    this._likeButton.classList.add('card__like-button_active');
   }

   removeLike() {
    this._likeButton.classList.remove('card__like-button_active');
   }

   removeCard() {
    this._card.remove();
    this._card = null;
   }

   checkedLike() {
    return this._likes.find((user) => {
      user._id === this._userId;
    });
   }

  setLikes(likes) {
    this._likes = likes;
    this._counterLikeCard.textContent = this._likes.length;
    if (this.checkedLike()) {
      this.pushLike();
    } else {
      this.removeLike();
    }
  };
}