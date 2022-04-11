//'use strict';

import { openImagePopup } from './index.js';

export class Card {
  constructor(cardInfo, cardTemplate) {
    this._cardTemplate = cardTemplate;
    this._name = cardInfo.name;
    this._link = cardInfo.link;
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
    this._setEventListeners();
    this._card.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__trash-button').addEventListener('click', evt => {
      this._card.remove();
      this._element = null;
    });
    
    this._card.querySelector('.card__like-button').addEventListener('click', evt => {
      evt.target.classList.toggle('card__like-button_active');
    });
    this._cardImage.addEventListener('click', () => {
      openImagePopup(this._link, this._name);
    })
  }
}